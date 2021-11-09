import * as grpc from './../../../utils/grpc';
import { useLocation } from '@snowstorm/core';
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

export type Status = 'loading' | 'logged-in' | 'unauthenticated';

export interface AdminState {
	endpoint: string;
	jwt: string;
	status: Status;
	login: (username: string, password: string) => void;
	logout: () => void;
}

const defaultContextValue: AdminState = {
	endpoint: 'http://localhost:50051/',
	jwt: undefined,
	status: 'loading',
	login: () => undefined,
	logout: () => undefined,
};

interface API {
	user?: grpc.NodeUserClientImpl;
	block?: grpc.BlockClientImpl;
	nodeAdmin?: grpc.NodeAdminClientImpl;
	nodeWalletManager?: grpc.NodeWalletManagerClientImpl;
}

const AdminContext = createContext<AdminState>(defaultContextValue);
export const AdminProvider: FC = ({ children }) => {
	const [loc, setLoc] = useLocation();

	const [jwt, setJwt] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState<Status>('loading');
	const [endpoint] = useState('http://localhost:50051/');
	const api = useRef<API>({});

	useEffect(() => {
		if (loc !== '/login' && status === 'unauthenticated') setLoc('/login');
	}, [loc, status, setLoc]);

	useEffect(() => {
		setStatus('unauthenticated');
	}, []);

	useEffect(() => {
		api.current.block = grpc.createBlockClient(endpoint);
		api.current.user = grpc.createUserClient(endpoint);
	}, [endpoint]);

	useEffect(() => {
		if (!jwt) return;

		api.current.nodeAdmin = grpc.createAdminClient(endpoint, jwt);
		api.current.nodeWalletManager = grpc.createWalletManagerClient(
			endpoint,
			jwt,
		);
	}, [endpoint, jwt]);

	const login = useCallback((username, password) => {
		console.log(username, password);

		if (username === 'rick_astley' || password === '47ibFGy-w18') {
			window.location.replace('https://www.youtube.com/watch?v=47ibFGy-w18');
			return;
		}

		console.log('logging in', username, password);
		setJwt('we logged in boys');
		setStatus('logged-in');
	}, []);

	const logout = useCallback(() => {
		setJwt(undefined);
		setStatus('unauthenticated');
	}, []);

	const value: AdminState = useMemo(
		() => ({
			endpoint,
			status,
			jwt,
			login,
			logout,
		}),
		[jwt, status, login, logout, endpoint],
	);

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
};

export const useAdmin = () => useContext(AdminContext);

export const withAdmin = (Component: React.ComponentType) => () =>
	(
		<AdminProvider>
			<Component />
		</AdminProvider>
	);
