import { Layout } from '../components/layout';
import { useAdmin } from '../state';
import { useQuery } from 'react-query';
import { sortBy } from '@pognetwork/proto/node/rpc/lattice';
import { Zbase } from 'champ-wasm';

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

	return (
		<div>
			{data.map(block => (
				<div key={block.blockId.toString()}>
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
								<td>{JSON.stringify(block.data.transactions)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};
