import { useLocation } from '@snowstorm/core';
import { Layout } from '../../components/layout';
import { useWallet } from '../../state';
import styles from './tx.module.scss';
import buttonStyles from './../../../../components/button.module.scss';
import { createGenesisBalanceClaimBlock } from '../../state/api';

export const Debug = () => {
	const ctx = useWallet();
	const [, setLocation] = useLocation();
	if (!ctx.currentWallet) {
		setLocation('/');
		return <div />;
	}

	const claim = () => {
		const block = createGenesisBalanceClaimBlock(ctx.currentWallet, 1000);
		ctx.api.lattice
			.submitBlock(block)
			.then(r => console.log(`successfully submitted block`, r))
			.catch(console.error);
	};

	console.log(ctx.currentWallet);

	return (
		<Layout className={styles.layout}>
			<button className={buttonStyles.button} type="button" onClick={claim}>
				Claim Genesis Block (1000POG)
			</button>
		</Layout>
	);
};
