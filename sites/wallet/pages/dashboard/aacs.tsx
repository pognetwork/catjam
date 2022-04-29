import { useLocation } from '@snowstorm/core';
import { Layout } from '../../components/layout';
import { useWallet } from '../../state';
import styles from './tx.module.scss';

export const Aacs = () => {
	const ctx = useWallet();
	const [, setLocation] = useLocation();
	if (!ctx.currentWallet) {
		setLocation('/');
		return <div />;
	}

	return <Layout className={styles.layout} />;
};
