import { arrowDownIcon, moneyIcon, sendIcon } from '../../../../assets/icons';
import { Layout } from '../../components/layout';
import styles from './index.module.scss';

export const Index = () => (
	<Layout className={styles.layout}>
		<div className={`${styles.overview} ${styles.box}`}>
			<div className={styles.ballance}>10000 POG</div>
			<div className={styles.ballanceSmall}>124 USD</div>
			<div className={styles.actions}>
				<div className={styles.action}>
					{sendIcon}
					Send
				</div>
				<div className={styles.action}>
					{arrowDownIcon}
					Recieve
				</div>
				<div className={styles.action}>
					{moneyIcon}
					Buy
				</div>
			</div>
		</div>
		<div className={`${styles.rightstuff} ${styles.box}`} />
		<div className={`${styles.bigstuff} ${styles.box}`} />
		<div className={`${styles.bigstuff} ${styles.box}`} />
	</Layout>
);
