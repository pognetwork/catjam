import { Link } from '@snowstorm/core';

import buttonStyles from './../../../components/button.module.scss';
import { Layout } from '../../../components/layout';
import styles from './index.module.scss';

import pogchan from './../assets/pogchan.png';
import shiba from './../assets/shiba.png';
import astronaut from './../assets/astronaut.png';

export const Index = () => (
	<Layout className={styles.layout}>
		<div className={styles.content}>
			<h1>Welcome to MyPOG</h1>
			<p>
				MyPOG is the standard interface for interacting with the POG Network.
				This client-side app allows you to open and generate wallets and much
				more!
			</p>
			<div className={styles.buttons}>
				<Link href="/create">
					{/* <button
						type="button"
						className={`${buttonStyles.button} ${buttonStyles.active}`}
					>
						Create a new wallet
					</button> */}
				</Link>
				<Link href="/access">
					{/* <button type="button" className={buttonStyles.button}>
						Access my wallet
					</button> */}
				</Link>
			</div>
		</div>
		<div className={styles.hero}>
			<img src={`${astronaut}`} />
		</div>
	</Layout>
);
