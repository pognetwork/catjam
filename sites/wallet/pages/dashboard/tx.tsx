import { useLocation } from '@snowstorm/core';
import { Input } from '../../../../components/input';
import { Layout } from '../../components/layout';
import { useWallet } from '../../state';
import styles from './tx.module.scss';
import buttonStyles from './../../../../components/button.module.scss';
import { useState } from 'react';
import { createBlock } from '../../state/api';
import { useQuery } from 'react-query';
import { Util, Zbase } from 'champ-wasm';

export const Tx = () => {
	const [recipient, setRecipient] = useState('');
	const [amount, setAmount] = useState('');
	const update = (f: (v: string) => void) => e => f(e.target.value);
	const ctx = useWallet();

	const { isLoading, error, data } = useQuery(
		`send`,
		async () =>
			ctx.api.lattice
				.getLatestBlock({
					address: Util.account_id_from_public_key(ctx.currentWallet.publicKey),
				})
				.then(b => b),
		{
			enabled: Boolean(ctx.currentWallet),
		},
	);

	const [, setLocation] = useLocation();
	if (!ctx.currentWallet) {
		setLocation('/');
		return <div />;
	}

	const send = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRecipient('');
		setAmount('');
		const a = parseFloat(amount);
		const r = recipient.replace('POG-', '').replace('pog-', '');

		const block = createBlock({
			height: data.block.data.height + 1,
			newBal: data.block.data.balance - a,
			previous: data.block.blockId,
			transactions: [
				{
					txSend: {
						amount: a,
						receiver: Zbase.decode(r),
						data: new Uint8Array(),
					},
					txClaim: undefined,
					txDelegate: undefined,
					txOpen: undefined,
				},
			],
		});

		const signature = ctx.currentWallet.sign(block);

		const signedBlock = {
			data: block,
			header: {
				publicKey: ctx.currentWallet.publicKey,
				signature,
				timestamp: Date.now(),
			},
		};

		console.log(signedBlock);

		ctx.api.lattice
			.submitBlock(signedBlock)
			.then(() => {
				setLocation('/dashboard');
			})
			.catch(console.error);
	};

	return (
		<Layout className={styles.layout}>
			<form className={styles.form} onSubmit={send}>
				<h1>New Transaction</h1>
				<label>Recipient</label>
				<Input
					value={recipient}
					onChange={update(setRecipient)}
					placeholder="pog-ybwdyt1nj1489tea1dk19ogd8i6nttt4nt6fw6o"
				/>
				<label>Amount</label>
				<Input
					type="number"
					value={amount}
					onChange={update(setAmount)}
					placeholder="100"
				/>
				<button
					disabled={amount === '' || recipient === ''}
					type="submit"
					className={buttonStyles.button}
				>
					Send
				</button>
			</form>
		</Layout>
	);
};
