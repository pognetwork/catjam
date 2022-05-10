import { Wallet } from 'champ-wasm';
import {
	BlockData,
	BlockVersion,
	RawBlock,
	SigType,
	Transaction,
} from '@pognetwork/proto';

export interface CreateBlockArgs {
	transactions: Transaction[];
	newBal: number;
	height: number;
	previous: Uint8Array;
}

export const createBlock = ({
	transactions,
	newBal,
	height,
	previous,
}: CreateBlockArgs) => {
	const block = BlockData.encode({
		balance: newBal,
		height,
		previous,
		signatureType: SigType.Ed25519,
		transactions,
		version: BlockVersion.V1,
	});

	return block.finish();
};

export const createGenesisBalanceClaimBlock = (
	wallet: Wallet,
	amount: number,
): RawBlock => {
	const block = createBlock({
		height: 0,
		newBal: amount,
		previous: new Uint8Array(),
		transactions: [
			{
				txClaim: { sendTransactionID: new Uint8Array() },
				txDelegate: undefined,
				txOpen: undefined,
				txSend: undefined,
			},
		],
	});

	const signature = wallet.sign(block);

	return {
		data: block,
		header: {
			publicKey: wallet.publicKey,
			signature,
			timestamp: Date.now(),
		},
	};
};
