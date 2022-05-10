import { Layout } from '../components/layout';
import { useAdmin } from '../state';
import { useQuery } from 'react-query';
import { sortBy } from '@pognetwork/proto/node/rpc/lattice';

export const Explorer = () => (
	<Layout noSSR>
		<ExplorerPage />
	</Layout>
);

const ExplorerPage = () => {
	const admin = useAdmin();

	const { isLoading, error, data } = useQuery('latest_blocks', async () =>
		admin.api.lattice
			.getBlocks({ limit: 100, offset: 0, sortBy: sortBy.data_desc })
			.then(v => v.blocks)
			.catch(console.error),
	);

	console.log(data);

	return <div>{}</div>;
};
