import { ChangeEvent, useState } from 'react';
import { useLocation } from '@snowstorm/core';

import styles from './login.module.scss';
import { useAdmin } from '../state';

import { Input } from '../../../components/input';
import { Layout } from '../components/layout';

export const Login = () => {
	const admin = useAdmin();
	const [, setLoc] = useLocation();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const onChange =
		(func: (str: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
			func(e.target.value);

	const onLogin = () => {
		setLoading(true);

		admin
			.login(username, password)
			.then(() => {
				setLoc('/');
			})
			.catch(e => {
				setError(true);
				console.error(e);
			});
	};

	return (
		<Layout className={styles.layout}>
			<form
				onSubmit={e => {
					e.preventDefault();
					onLogin();
				}}
			>
				<h1>Login</h1>
				<div className={styles.inputs}>
					<Input
						onChange={onChange(setUsername)}
						value={username}
						placeholder="Username"
						autoComplete="username"
					/>
					<Input
						onChange={onChange(setPassword)}
						value={password}
						password
						placeholder="Password"
						autoComplete="current-password"
					/>
				</div>
				<button onClick={onLogin} type="submit">
					Login
				</button>
			</form>
		</Layout>
	);
};
