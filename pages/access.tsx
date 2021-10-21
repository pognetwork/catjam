import { Link } from '@snowstorm/core';

import { Layout } from './../components/layout';
import styles from './access-create.module.scss';

export const Access = () => (
	<Layout className={styles.layout}>
		<div className={styles.content}>
			<h2>
				Please select a method to create a new Wallet.
				<br />
				Don't have a wallet? <Link href="/create">Create Wallet</Link>
			</h2>
			<div className={styles.methods}>
				<div>
					<h2>Wallet File (Software)</h2>
					<p>
						(This should only be used by experienced users in an offline
						setting)
					</p>
				</div>
				<div className={styles.inactive}>
					<h2>More to follow soon</h2>
				</div>
			</div>
		</div>
	</Layout>
);
