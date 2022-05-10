import * as grpc from './../../../utils/grpc';

import {
	createContext,
	FC,
	ReactElement,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useLocalStorage } from 'react-use';
import init, { Wallet } from 'champ-wasm';
import {
	BlockData,
	BlockVersion,
	SigType,
	Transaction,
} from '@pognetwork/proto';

let endpoint = 'https://node.pog.network';
if (!import.meta.env.SSR) {
	endpoint = location.hostname.endsWith('localhost')
		? 'http://localhost:50051'
		: location.origin;
}

interface WalletState {
	settings: WalletSettings;
	setSettings: (newSettings: Partial<WalletSettings>) => void;
	wasmReady: boolean;
	currentWallet: Wallet | undefined;
	createBlock: (block: CreateBlockArgs) => Uint8Array;
	claimGenesisBalance: (amount: number) => void;
}

interface API {
	lattice?: grpc.LatticeClientImpl;
}

interface WalletSettings {
	endpoint: string;
}

const defaultWalletSettings: WalletSettings = { endpoint };
const defaultContextValue: WalletState = {
	settings: defaultWalletSettings,
	wasmReady: false,
	setSettings: () => undefined,
	currentWallet: undefined,
	createBlock: () => new Uint8Array(),
	claimGenesisBalance: () => undefined,
};

export interface CreateBlockArgs {
	transactions: Transaction[];
	newBal: number;
	height: number;
	previous: Uint8Array;
}

const WalletContext = createContext<WalletState>(defaultContextValue);
export const WalletProvider: FC = ({
	children,
}: {
	children: ReactElement;
}) => {
	const [wasmReady, setWasmReady] = useState(false);
	useEffect(() => {
		if (!import.meta.env.SSR) {
			void init()
				.then(_x => {
					setWasmReady(true);
				})
				.catch(e => console.error('Failed to load wasm module: ', e));
		}
	}, []);

	const [_settings, _setSettings] = useLocalStorage<string>('{}');
	const currentWallet = useRef<Wallet | undefined>(undefined);

	const settings: WalletSettings = useMemo(() => {
		try {
			return JSON.parse(_settings);
		} catch {
			_setSettings('{}');
			return defaultWalletSettings;
		}
	}, [_settings, _setSettings]);

	const setSettings = useCallback(
		(newSettings: Partial<WalletSettings>) =>
			_setSettings(
				JSON.stringify({
					...defaultWalletSettings,
					...newSettings,
				}),
			),
		[_setSettings],
	);

	const api = useRef<API>();

	const updateEndpoint = useCallback(() => {
		api.current = {
			lattice: grpc.createLatticeClient(endpoint),
		};
	}, []);

	if (!api.current) updateEndpoint();

	const createBlock = useCallback(
		({ transactions, newBal, height, previous }: CreateBlockArgs) => {
			const block = BlockData.encode({
				balance: newBal,
				height,
				previous,
				signatureType: SigType.Ed25519,
				transactions,
				version: BlockVersion.V1,
			});

			return block.finish();
		},
		[],
	);

	const claimGenesisBalance = useCallback(
		(amount: number) => {
			const block = createBlock({
				height: 0,
				newBal: amount,
				previous: new Uint8Array(),
				transactions: [
					{
						txClaim: { sendTransactionID: new Uint8Array() },
						txDelegate: undefined,
						txOpen: undefined,
						txSend: undefined,
					},
				],
			});

			const signature = currentWallet.current.sign(block);

			void api.current.lattice.submitBlock({
				data: block,
				header: {
					publicKey: currentWallet.current.publicKey,
					signature,
					timestamp: Date.now(),
				},
			});
		},
		[createBlock],
	);

	const value: WalletState = useMemo(
		() => ({
			settings,
			wasmReady,
			api: api.current,
			setSettings,
			currentWallet: currentWallet.current,
			createBlock,
			claimGenesisBalance,
		}),
		[settings, api, setSettings, wasmReady, createBlock, claimGenesisBalance],
	);

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};

export const useWallet = () => useContext(WalletContext);
