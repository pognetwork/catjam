import * as grpc from './../../../utils/grpc';

import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useLocalStorage } from 'react-use';
import init, { Wallet } from 'champ-wasm';

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
};

const WalletContext = createContext<WalletState>(defaultContextValue);
export const WalletProvider: FC = ({ children }) => {
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

	const value: WalletState = useMemo(
		() => ({
			settings,
			wasmReady,
			api: api.current,
			setSettings,
		}),
		[settings, api, setSettings, wasmReady],
	);

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};

export const useWallet = () => useContext(WalletContext);
