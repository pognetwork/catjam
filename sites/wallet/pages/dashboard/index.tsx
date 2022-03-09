import { arrowDownIcon, moneyIcon, sendIcon } from '../../../../assets/icons';
import { DemoGraph } from '../../components/dashboard/graphs/demo';
import { Layout } from '../../components/layout';
import styles from './index.module.scss';
import useDimensions from 'react-cool-dimensions';

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

const Overview = () => (
	<div className={`${styles.overview} ${styles.box}`}>
		<div className={styles.address}>
			pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta
		</div>
		<div className={styles.ballance}>
			10000 POG <span>124 USD</span>
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

const Stats = () => (
	<div className={`${styles.rightstuff} ${styles.box} ${styles.stats}`}>
		<table>
			<tbody>
				<tr>
					<td>Representative</td>
					<td>-</td>
				</tr>
				<tr>
					<td>Voting Power</td>
					<td>
						{new Intl.NumberFormat('en-US', {
							minimumFractionDigits: 2,
						}).format(133123123.12)}
					</td>
				</tr>
				<tr>
					<td>Transactions</td>
					<td>200</td>
				</tr>
				<tr>
					<td>Unclaimed Balance</td>
					<td>
						{new Intl.NumberFormat('en-US', {
							minimumFractionDigits: 2,
						}).format(1000)}{' '}
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

export const Index = () => (
	<Layout className={styles.layout}>
		<Overview />
		<Stats />
		<AccountBalanceGraph />
		<Transactions />
	</Layout>
);
