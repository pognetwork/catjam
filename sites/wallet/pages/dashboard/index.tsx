import { arrowDownIcon, moneyIcon, sendIcon } from '../../../../assets/icons';
import { DemoGraph } from '../../components/dashboard/graphs/demo';
import { Layout } from '../../components/layout';
import styles from './index.module.scss';
import useDimensions from 'react-cool-dimensions';
import { useWallet } from '../../state';
import { useLocation } from '@snowstorm/core';
import { Wallet } from 'champ-wasm';

const AccountBalanceGraph = () => {
	const { observe, unobserve, width, height, entry } = useDimensions({
		onResize({ observe, unobserve, width, height, entry }) {
			// Triggered whenever the size of the target is changed...
			// unobserve(); // To stop observing the current target element
			// observe(); // To re-start observing the current target element
		},
	});

	return (
		<div
			ref={observe}
			className={`${styles.bigstuff} ${styles.box} ${styles.balanceGraph}`}
		>
			<h1>Balance</h1>
			<DemoGraph width={width} height={height} />
		</div>
	);
};

const Overview = ({ wallet }: { wallet: Wallet }) => (
	<div className={`${styles.overview} ${styles.box}`}>
		<div className={styles.address}>pog-{wallet.address}</div>
		<div className={styles.ballance}>
			0 POG <span>0 USD</span>
		</div>
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
);

const Stats: React.FC<{
	rep?: string;
	power: number;
	txCount: number;
	unclaimedBal: number;
}> = ({ power, txCount, unclaimedBal, rep }) => (
	<div className={`${styles.rightstuff} ${styles.box} ${styles.stats}`}>
		<table>
			<tbody>
				<tr>
					<td>Representative</td>
					<td>{rep ? rep : '-'}</td>
				</tr>
				<tr>
					<td>Voting Power</td>
					<td>
						{new Intl.NumberFormat('en-US', {
							minimumFractionDigits: 2,
						}).format(power)}
					</td>
				</tr>
				<tr>
					<td>Transactions</td>
					<td>{txCount}</td>
				</tr>
				<tr>
					<td>Unclaimed Balance</td>
					<td>
						{new Intl.NumberFormat('en-US', {
							minimumFractionDigits: 2,
						}).format(unclaimedBal)}{' '}
						POG
					</td>
				</tr>
			</tbody>
		</table>
	</div>
);

const demoTransactions = [
	{
		id: 1,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
	{
		id: 1,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
	{
		id: 1,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
	{
		id: 1,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
];

const Transactions = () => (
	<div className={`${styles.bigstuff} ${styles.box} ${styles.transactions}`}>
		<h1>Recent Transactions</h1>
		<table>
			<thead>
				<tr>
					<td>Date</td>
					<td>From</td>
					{/* <td>To</td> */}
					<td>Amount</td>
				</tr>
			</thead>
			<tbody>
				{demoTransactions.map(tx => (
					<tr key={tx.id}>
						<td>
							{new Intl.DateTimeFormat('en-US', {
								dateStyle: 'medium',
								timeStyle: 'medium',
							}).format(tx.date)}
						</td>
						<td>
							<div className={styles.txfrom}>
								<div>{tx.from.name}</div>
								<div>{tx.from.address}</div>
							</div>
						</td>
						<td>
							<div>
								{new Intl.NumberFormat('en-US', {
									minimumFractionDigits: 2,
								}).format(tx.amount)}{' '}
								POG
							</div>
							<div>
								{new Intl.NumberFormat('en-US', {
									minimumFractionDigits: 2,
								}).format(tx.amount / 10)}{' '}
								USD
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const Index = () => {
	const ctx = useWallet();
	const [, setLocation] = useLocation();
	if (!ctx.currentWallet) {
		setLocation('/');
		return <div />;
	}

	return (
		<Layout className={styles.layout}>
			<>
				<Overview wallet={ctx.currentWallet} />
				<Stats power={0} txCount={0} unclaimedBal={0} rep={undefined} />
				<AccountBalanceGraph />
				<Transactions />
			</>
		</Layout>
	);
};
