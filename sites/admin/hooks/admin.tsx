import { useLocation } from '@snowstorm/core';
import {
	Component,
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

export type Status = 'loading' | 'logged-in' | 'unauthenticated';

export interface AdminState {
	jwt: string;
	status: Status;
	login: (username: string, password: string) => void;
	logout: () => void;
}

const defaultContextValue: AdminState = {
	jwt: undefined,
	status: 'loading',
	login: () => undefined,
	logout: () => undefined,
};

const AdminContext = createContext<AdminState>(defaultContextValue);
export const AdminProvider: FC = ({ children }) => {
	const [loc, setLoc] = useLocation();

	const [jwt, setJwt] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState<Status>('loading');

	useEffect(() => {
		if (loc !== '/login' && status === 'unauthenticated') setLoc('/login');
	}, [loc, status, setLoc]);

	useEffect(() => {
		setStatus('unauthenticated');
	}, []);

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
			status,
			jwt,
			login,
			logout,
		}),
		[jwt, status, login, logout],
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
