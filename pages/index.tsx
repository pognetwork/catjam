import { Layout } from './../components/layout';
import styles from './index.module.scss';

export const Index = () => (
	<Layout className={styles.layout}>
		<div className={styles.content}>
			<h1>Welcome to MyPOG</h1>
			<p>
				MyPOG is the standard interface for interacting with the POG Network.
				This client-side app allows you to open and generate wallets and much
				more!
			</p>
			<div>
				<button type="button" className={`${styles.button} ${styles.active}`}>
					Create a new wallet
				</button>
				<button type="button" className={styles.button}>
					Access my wallet
				</button>
			</div>
		</div>
		<div className={styles.hero}>
			<img src="https://i.imgur.com/holg3bP.png" />
		</div>
	</Layout>
);
