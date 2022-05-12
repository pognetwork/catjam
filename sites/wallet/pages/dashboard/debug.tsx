import { useLocation } from '@snowstorm/core';
import { Layout } from '../../components/layout';
import { useWallet } from '../../state';
import styles from './debug.module.scss';
import buttonStyles from './../../../../components/button.module.scss';
import { createGenesisBalanceClaimBlock } from '../../state/api';
import { Wallet } from 'champ-wasm';

export const Debug = () => {
	const ctx = useWallet();

	const claim = () => {
		const block = createGenesisBalanceClaimBlock(ctx.currentWallet, 1000);
		ctx.api.lattice
			.submitBlock(block)
			.then(r => console.log(`successfully submitted block`, r))
			.catch(console.error);
	};

	const gen = () => {
		const wallet = Wallet.generateJSON('password');
		wallet.unlock('password');
		ctx.currentWallet = wallet;
	};

	return (
		<Layout className={styles.layout}>
			<>
				<button className={buttonStyles.button} type="button" onClick={claim}>
					Claim Genesis Block (1000POG)
				</button>
				<button className={buttonStyles.button} type="button" onClick={gen}>
					Generate Wallet
				</button>
			</>
		</Layout>
	);
};
