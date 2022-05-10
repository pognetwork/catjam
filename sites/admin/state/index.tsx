import * as grpc from './../../../utils/grpc';
import { useLocation } from '@snowstorm/core';

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

import { parseJWT } from '../../../utils/jwt';
import { useLocalStorage } from 'react-use';
import init from 'champ-wasm';

export type Status = 'authenticated' | 'unauthenticated' | 'loading';

export interface AdminState {
	endpoint: string;
	jwt: string;
	jwtData?: JWT;
	status: Status;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	api: API;
	wasmReady: boolean;
}

export interface JWT {
	exp: number;
	ias: number;
	iss: string;
	sub: string;
	username: string;
}

let endpoint = import.meta.env.SSR
	? 'https://pog-grpc.explodingcamera.com'
	: location.origin;

if (!import.meta.env.SSR && location.hostname.endsWith('localhost')) {
	endpoint = 'http://localhost:50051';
}

const defaultContextValue: AdminState = {
	endpoint,
	jwt: undefined,
	status: 'loading',
	login: async () => Promise.reject(new Error('endpoint not loaded')),
	logout: () => undefined,
	api: {},
	jwtData: undefined,
	wasmReady: false,
};

interface API {
	user?: grpc.NodeUserClientImpl;
	lattice?: grpc.LatticeClientImpl;
	nodeAdmin?: grpc.NodeAdminClientImpl;
	nodeWalletManager?: grpc.NodeWalletManagerClientImpl;
}

const AdminContext = createContext<AdminState>(defaultContextValue);
export const AdminProvider: FC<{ children: ReactElement }> = ({ children }) => {
	const [loc, setLoc] = useLocation();
	const [jwt, setJwt] = useLocalStorage<string | undefined>('jwt');

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

	const [status, setStatus] = useState<Status>(
		jwt ? 'authenticated' : 'unauthenticated',
	);

	const api = useRef<API>();

	const updateEndpoint = useCallback(() => {
		api.current = {
			lattice: grpc.createLatticeClient(endpoint),
			user: grpc.createUserClient(endpoint),
		};

		if (!jwt) return;
		api.current.nodeAdmin = grpc.createAdminClient(endpoint, jwt);
		api.current.nodeWalletManager = grpc.createWalletManagerClient(
			endpoint,
			jwt,
		);
	}, [jwt]);

	if (!api.current) updateEndpoint();

	useEffect(() => {
		if (loc !== '/login' && status === 'unauthenticated') setLoc('/login');
	}, [loc, status, setLoc]);

	useEffect(() => {
		if (jwt) updateEndpoint();
	}, [jwt, updateEndpoint]);

	const login: (username: string, password: string) => Promise<void> =
		useCallback(
			async (username, password) => {
				if (username === 'rick_astley' || password === '47ibFGy-w18') {
					window.location.replace(
						'https://www.youtube.com/watch?v=47ibFGy-w18',
					);
					return;
				}

				return api.current.user
					?.login({ password, username })
					.then(async jwt => {
						setJwt(jwt.token);
						setStatus('authenticated');
						return new Promise(resolve => {
							setTimeout(resolve, 100);
						});
					});
			},
			[setStatus, setJwt],
		);

	const logout = useCallback(() => {
		setJwt(undefined);
		setStatus('unauthenticated');
	}, [setJwt]);

	const tokenContents = useMemo(() => {
		const contents = parseJWT<JWT | undefined>(jwt);
		// token expires in less than 5 minutes or is expired
		if (contents && (contents.exp - 1000 * 5) * 1000 < Date.now()) logout();
		return contents;
	}, [jwt, logout]);

	const value: AdminState = useMemo(
		() => ({
			endpoint,
			status,
			jwt,
			login,
			logout,
			api: api.current,
			jwtData: tokenContents,
			wasmReady,
		}),
		[jwt, status, login, logout, tokenContents, wasmReady],
	);

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
};

export const useAdmin = () => useContext(AdminContext);
