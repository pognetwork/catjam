import { arrowDownIcon, moneyIcon, sendIcon } from '../../../../assets/icons';
import { Data, DemoGraph } from '../../components/dashboard/graphs/demo';
import { Layout } from '../../components/layout';
import styles from './index.module.scss';
import useDimensions from 'react-cool-dimensions';
import { useWallet } from '../../state';
import { useLocation } from '@snowstorm/core';
import { Util, Wallet, Zbase } from 'champ-wasm';
import { useQuery } from 'react-query';
import { Block, Transaction } from '@pognetwork/proto/node/api';
import { Tx } from '@pognetwork/proto/node/rpc/lattice';

const AccountBalanceGraph = ({ data }: { data: Data[] }) => {
	const { observe, width, height } = useDimensions({});

	return (
		<div
			ref={observe}
			className={`${styles.bigstuff} ${styles.box} ${styles.balanceGraph}`}
		>
			<h1>Balance</h1>
			<DemoGraph data={data || []} width={width} height={height} />
		</div>
	);
};

const Overview = ({ wallet, balance }: { wallet: Wallet; balance: number }) => {
	const [, setLocation] = useLocation();
	const send = () => setLocation('/dashboard/tx');
	return (
		<div className={`${styles.overview} ${styles.box}`}>
			<div className={styles.address}>pog-{wallet.address}</div>
			<div className={styles.ballance}>
				{balance} POG <span>0 USD</span>
			</div>
			<div className={styles.actions}>
				<div onClick={send} className={styles.action}>
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
};

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

const Transactions = ({
	unclaimed,
	blocks,
}: {
	unclaimed: Tx[];
	blocks: Block[];
}) => (
	<div className={`${styles.bigstuff} ${styles.box} ${styles.transactions}`}>
		<h1>Recent Transactions</h1>
		<table>
			<thead>
				<tr>
					<td>Date</td>
					<td>From</td>
					<td>To</td>
					<td>Amount</td>
				</tr>
			</thead>
			<tbody>
				{unclaimed.map(tx => {
					const stxid = Zbase.encode(tx.transactionId);

					return (
						<Trx2
							key={stxid}
							txid={tx.transactionId}
							stxid={stxid}
							tx={tx.transaction}
						/>
					);
				})}
				{blocks.map(block =>
					Array.from(block.data.transactions.entries())
						.filter(
							([_, t]) => t.txClaim !== undefined || t.txSend !== undefined,
						)
						.map(([i, tx]) => {
							const txid = Util.getTransactionID(block.blockId, i);
							const stxid = Zbase.encode(txid);

							return (
								<Trx
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

const Trx2 = ({
	tx,
	block,
	txid,
	stxid,
}: {
	tx: Transaction;
	block?: Block;
	txid: Uint8Array;
	stxid: string;
}) => {
	const ctx = useWallet();
	const type = Object.entries(tx).find(
		([_, v]) => v !== undefined,
	)[0] as keyof Transaction;

	const {
		isLoading,
		error,
		data: sendTx,
	} = useQuery(
		`txsend-${stxid}`,
		async () =>
			ctx.api.lattice
				.getTXByID({
					transactionID: txid,
				})
				.then(b => b),
		{
			enabled: type === 'txSend',
		},
	);

	return (
		<tr>
			<td>unclaimed</td>
			<td>
				<div className={styles.txfrom}>
					<div>Unknown Account</div>
					<div>
						POG-{sendTx?.address?.length ? Zbase.encode(sendTx.address) : ''}
					</div>
				</div>
			</td>

			<td>
				<div className={styles.txto}>
					<div>This Account</div>
					<div className={styles.txto}>POG-{ctx.currentWallet?.address}</div>
				</div>
			</td>
			<td>
				<div>
					{new Intl.NumberFormat('en-US', {
						minimumFractionDigits: 2,
					}).format(tx.txSend.amount)}{' '}
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

const Trx = ({
	tx,
	block,
	txid,
	stxid,
}: {
	tx: Transaction;
	block?: Block;
	txid: Uint8Array;
	stxid: string;
}) => {
	const ctx = useWallet();
	const type = Object.entries(tx).find(
		([_, v]) => v !== undefined,
	)[0] as keyof Transaction;

	const {
		isLoading,
		error,
		data: claimData,
	} = useQuery(
		`txsend-${stxid}`,
		async () =>
			ctx.api.lattice
				.getTXByID({
					transactionID: tx.txClaim.sendTransactionID,
				})
				.then(b => b),
		{
			enabled:
				type === 'txClaim' && Boolean(tx.txClaim?.sendTransactionID.length),
		},
	);

	const isGenesis =
		type === 'txClaim'
			? tx.txClaim?.sendTransactionID.length === 0
			: tx.txSend.receiver.length === 0;

	let amount = 0;
	if (type === 'txClaim') {
		amount = isGenesis
			? block.data.balance
			: claimData?.transaction.txSend.amount || 0;
	}

	if (type === 'txSend') {
		amount = tx.txSend.amount;
	}

	return (
		<tr>
			<td>
				{block &&
					new Intl.DateTimeFormat('en-US', {
						dateStyle: 'medium',
						timeStyle: 'medium',
					}).format(block.header?.timestamp)}
			</td>
			<td>
				<div className={styles.txfrom}>
					{type === 'txClaim' &&
						(isGenesis ? (
							<>
								<div>Genesis Account</div>
								<div>POG-0000000000000000000000</div>
							</>
						) : (
							<>
								<div>Unknown Account</div>
								<div>POG-{Zbase.encode(claimData.address)}</div>
							</>
						))}

					{type === 'txSend' && (
						<>
							<div>This Account</div>
							<div>
								{block && (
									<>
										POG-
										{Zbase.encode(
											Util.account_id_from_public_key(block.header.publicKey),
										)}
									</>
								)}
							</div>
						</>
					)}
				</div>
			</td>

			<td>
				<div className={styles.txto}>
					{type === 'txSend' &&
						(isGenesis ? (
							<>
								<div>Genesis Account</div>
								<div>POG-0000000000000000000000</div>
							</>
						) : (
							<>
								<div>Unknown Account</div>
								<div>POG-{Zbase.encode(tx.txSend.receiver)}</div>
							</>
						))}
					{type === 'txClaim' && (
						<>
							<div>This Account</div>
							<div>
								{block && (
									<>
										POG-
										{Zbase.encode(
											Util.account_id_from_public_key(block.header.publicKey),
										)}
									</>
								)}
							</div>
						</>
					)}{' '}
				</div>
			</td>
			<td>
				<div>
					{new Intl.NumberFormat('en-US', {
						minimumFractionDigits: 2,
					}).format(amount)}{' '}
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
				.getUnclaimedTransactions({
					address,
				})
				.then(b => b.data),
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

	const [transactions, balance, blocks] = data || [];
	const txCount = blocks?.reduce(
		(prev, curr) => prev + curr.data.transactions.length,
		0,
	);

	const moneyData =
		blocks?.map(b => ({
			timestamp: b.header.timestamp,
			balance: b.data.balance,
		})) || [];

	return (
		<>
			<Overview wallet={ctx.currentWallet} balance={balance ?? 0} />
			<Stats power={0} txCount={txCount} unclaimedBal={0} rep={undefined} />
			<AccountBalanceGraph data={moneyData} />
			<Transactions unclaimed={transactions || []} blocks={blocks || []} />
		</>
	);
};
