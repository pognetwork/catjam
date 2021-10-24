import { WALLET_TYPES } from '../../utils/types';

import { Link } from '@snowstorm/core';
import styles from './styles.module.scss';

export const SelectType = ({
	select,
	type,
}: {
	type: 'create' | 'access';
	select: (WALLET_TYPES) => () => void;
}) => (
	<>
		<h2>
			{type === 'access'
				? 'Please select a method to access your Wallet.'
				: 'Please select a method to create a new Wallet.'}
			<br />
			{type === 'access' ? (
				<>
					Already have a wallet? <Link href="/access">Access Wallet</Link>
				</>
			) : (
				<>
					Don't have a wallet? <Link href="/create">Create Wallet</Link>
				</>
			)}
		</h2>
		<div className={styles.methods}>
			<div onClick={select(WALLET_TYPES.LULW_FILE)}>
				<h2>Wallet File (Software)</h2>
				<p>
					(This should only be used by experienced users in an offline setting)
				</p>
			</div>
			<div className={styles.inactive}>
				<h2>More to follow soon</h2>
			</div>
		</div>
	</>
);
