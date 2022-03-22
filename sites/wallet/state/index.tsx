import * as grpc from './../../../utils/grpc';

import {
	createContext,
	FC,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from 'react';

import { useLocalStorage } from 'react-use';

let endpoint = 'https://node.pog.network';
if (!import.meta.env.SSR) {
	endpoint = location.hostname.endsWith('localhost')
		? 'http://localhost:50051'
		: location.origin;
}

interface WalletState {
	settings: WalletSettings;
	setSettings: (newSettings: Partial<WalletSettings>) => void;
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
	setSettings: () => undefined,
};

const WalletContext = createContext<WalletState>(defaultContextValue);
export const WalletProvider: FC = ({ children }) => {
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
			api: api.current,
			setSettings,
		}),
		[settings, api, setSettings],
	);

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};

export const useWallet = () => useContext(WalletContext);
