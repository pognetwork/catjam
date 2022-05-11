import { Layout } from '../components/layout';
import { useAdmin } from '../state';
import { useQuery } from 'react-query';
import { sortBy } from '@pognetwork/proto/node/rpc/lattice';
import { Zbase } from 'champ-wasm';

import styles from './blocks.module.scss';

export const Blocks = () => (
	<Layout noSSR>
		<BlocksPage />
	</Layout>
);

const BlocksPage = () => {
	const admin = useAdmin();

	const { isLoading, error, data } = useQuery('latest_blocks', async () =>
		admin.api.lattice
			.getBlocks({ limit: 100, offset: 0, sortBy: sortBy.data_desc })
			.then(v => v.blocks)
			.catch(console.error),
	);

	if (!data || !admin.wasmReady) {
		return null;
	}

	console.log(data[0].data.transactions);

	return (
		<div>
			{data.map(block => (
				<div className={styles.block} key={block.blockId.toString()}>
					<table>
						<tbody>
							<tr>
								<td>BlockId</td>
								<td>{Zbase.encode(block.blockId)}</td>
							</tr>
							<tr>
								<td>Balance</td>
								<td>{block.data.balance}</td>
							</tr>
							<tr>
								<td>Height</td>
								<td>{block.data.height}</td>
							</tr>
							<tr>
								<td>Previous</td>
								<td>
									{block.data.previous.length
										? Zbase.encode(block.data.previous)
										: 'No Previous Block'}
								</td>
							</tr>
							<tr>
								<td>TXs</td>
								<td>
									{block.data.transactions
										?.map(tx =>
											Object.entries(tx).find(([_, v]) => v !== undefined),
										)
										.map(([type, value]) => `${type}: ${JSON.stringify(value)}`)
										.join(', ')}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};
