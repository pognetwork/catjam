import { arrowDownIcon, moneyIcon, sendIcon } from '../../../../assets/icons';
import { DemoGraph } from '../../components/dashboard/graphs/demo';
import { Layout } from '../../components/layout';
import styles from './index.module.scss';
import useDimensions from 'react-cool-dimensions';
import { useWallet } from '../../state';
import { useLocation } from '@snowstorm/core';
import { Util, Wallet, Zbase } from 'champ-wasm';
import { useQuery } from 'react-query';
import { Block, Transaction } from '@pognetwork/proto/node/api';

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

const Overview = ({ wallet, balance }: { wallet: Wallet; balance: number }) => (
	<div className={`${styles.overview} ${styles.box}`}>
		<div className={styles.address}>pog-{wallet.address}</div>
		<div className={styles.ballance}>
			{balance} POG <span>0 USD</span>
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
		id: 2,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
	{
		id: 3,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
	{
		id: 4,
		from: {
			name: 'Unknown Account',
			address: 'pog-yy5xyknabqan31b8fkpyrd4nydtwpausi3kxgta',
		},
		to: '',
		amount: 10000,
		date: 1636562281091,
	},
];

const Transactions = ({ blocks }: { blocks: Block[] }) => (
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
				{blocks.map(block =>
					Array.from(block.data.transactions.entries())
						.filter(([_, t]) => t.txClaim !== undefined)
						.map(([i, tx]) => {
							const txid = Util.getTransactionID(block.blockId, i);
							const stxid = Zbase.encode(txid);

							return (
								<Tx
									key={stxid}
									txid={txid}
									stxid={stxid}
									tx={tx}
									block={block}
								/>
							);
						}),
				)}
			</tbody>
		</table>
	</div>
);

const Tx = ({
	tx,
	block,
	txid,
	stxid,
}: {
	tx: Transaction;
	block: Block;
	txid: Uint8Array;
	stxid: string;
}) => {
	const ctx = useWallet();
	const {
		isLoading,
		error,
		data: senddata,
	} = useQuery(
		`txsend-${stxid}`,
		async () =>
			ctx.api.lattice
				.getTXByID({
					transactionID: tx.txClaim.sendTransactionID,
				})
				.then(b => b),
		{
			enabled: Boolean(tx.txClaim?.sendTransactionID.length),
		},
	);

	const isGenesis = tx.txClaim?.sendTransactionID.length === 0;

	return (
		<tr key={Zbase.encode(block.blockId)}>
			<td>
				{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeStyle: 'medium',
				}).format(block.header.timestamp)}
			</td>
			<td>
				<div className={styles.txfrom}>
					{isGenesis ? (
						<>
							<div>Genesis Account</div>
							<div>POG-0000000000000000000000</div>
						</>
					) : (
						<>
							<div>Unknown Account</div>
							<div>POG-{Zbase.encode(senddata.address)}</div>
						</>
					)}
				</div>
			</td>
			<td>
				<div>
					{new Intl.NumberFormat('en-US', {
						minimumFractionDigits: 2,
					}).format(
						isGenesis
							? block.data.balance
							: senddata?.transaction.txSend.amount || 0,
					)}{' '}
					POG
				</div>
				<div>
					{/* {new Intl.NumberFormat('en-US', {
						minimumFractionDigits: 2,
					}).format(data.transaction.txSend.amount / 10)}{' '} */}
					0 USD
				</div>
			</td>
		</tr>
	);
};

export const Index = () => {
	const [, setLocation] = useLocation();
	const ctx = useWallet();
	if (!ctx.currentWallet) {
		setLocation('/');
		return <div />;
	}

	return (
		<Layout className={styles.layout}>
			<IndexPage />
		</Layout>
	);
};

export const IndexPage = () => {
	const ctx = useWallet();
	const address = Zbase.decode(ctx.currentWallet.address);
	const { isLoading, error, data } = useQuery('user', async () =>
		Promise.all([
			ctx.api.lattice
				.getBalance({
					address,
				})
				.then(b => b.balance),
			ctx.api.lattice
				.getBlocks({
					limit: 100,
					offset: 0,
					address,
				})
				.then(b => b.blocks),
		]),
	);

	const [balance, blocks] = data || [];
	const txCount = blocks?.reduce(
		(prev, curr) => prev + curr.data.transactions.length,
		0,
	);

	return (
		<>
			<Overview wallet={ctx.currentWallet} balance={balance ?? 0} />
			<Stats power={0} txCount={txCount} unclaimedBal={0} rep={undefined} />
			<AccountBalanceGraph />
			<Transactions blocks={blocks || []} />
		</>
	);
};
