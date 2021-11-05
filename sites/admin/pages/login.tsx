import { Input } from '../../../components/input';
import { Layout } from '../components/layout';
import styles from './login.module.scss';
import { ChangeEvent, useState } from 'react';

export const Login = () => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const onChange =
		(func: (str: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
			func(e.target.value);

	return (
		<Layout className={styles.layout}>
			<div>
				<h1>Login</h1>
				<div className={styles.inputs}>
					<Input
						onChange={onChange(setUsername)}
						value={username}
						placeholder="Username"
					/>
					<Input
						onChange={onChange(setPassword)}
						value={password}
						password
						placeholder="Password"
					/>
				</div>
				<button type="button">Login</button>
			</div>
		</Layout>
	);
};
