import {
	createContext,
	FC,
	useContext,
	useMemo,
	useRef,
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
	const [jwt, setJwt] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState<Status>('loading');

	const login = (username, password) => {
		if (username === 'rick_astley' || password === '47ibFGy-w18') {
			window.location.replace('https://www.youtube.com/watch?v=47ibFGy-w18');
			return;
		}

		console.log('logging in', username, password);
		setJwt('we logged in boys');
		setStatus('logged-in');
	};

	const logout = () => {
		setJwt(undefined);
		setStatus('unauthenticated');
	};

	const value: AdminState = useMemo(
		() => ({
			status,
			jwt,
			login,
			logout,
		}),
		[jwt, status],
	);

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
};

export const useAdmin = () => {
	const state = useContext(AdminContext);
	console.log(state);
};
