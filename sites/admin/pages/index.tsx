import { Layout } from '../components/layout';
import { useAdmin } from '../state';
import { useQuery } from 'react-query';

import styles from './index.module.scss';

export const Index = () => (
	<Layout noSSR>
		<IndexPage />
	</Layout>
);

const IndexPage = () => {
	const admin = useAdmin();

	const { isLoading, error, data } = useQuery('nodeStats', async () =>
		Promise.all([
			admin.api.nodeAdmin?.getVersion({}).then(v => v.version),
			admin.api.nodeAdmin?.getChain({}).then(c => c.currentChain),
			admin.api.nodeAdmin?.getMode({}).then(m => m.currentMode),
			admin.api.nodeAdmin?.getNodeStatus({}).then(s => s.status),
			admin.api.nodeAdmin?.getBlockPoolSize({}).then(b => b.length),
		]).catch(console.error),
	);

	const [version, chain, mode, status, poolSize] = data || [];

	return (
		<div className={styles.index}>
			<h1>
				Welcome <span>{admin.jwtData?.username}</span>!
			</h1>
			<table className={styles.stats}>
				<tbody>
					<tr>
						<td>Version</td>
						<td>{version ? `champ v${version}` : 'failed to get version'}</td>
					</tr>
					<tr>
						<td>Chain</td>
						<td>{chain ? chain : 'failed to get chain'}</td>
					</tr>
					<tr>
						<td>Mode</td>
						<td>{mode ? modes[mode] : 'failed to get mode'}</td>
					</tr>
					<tr>
						<td>Status</td>
						<td>
							{typeof status === undefined
								? 'failed to get status'
								: statusList[status]}
						</td>
					</tr>
					<tr>
						<td>BlockPool Size&nbsp;&nbsp;</td>
						<td>
							{typeof poolSize === undefined
								? 'failed to get block pool size'
								: poolSize}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const modes = {
	0: 'PRIME',
	/** VALIDATING - non-prime delegates */
	1: 'VALIDATING',
	/** OBSERVER - non-interacting node */
	2: 'OBSERVER',
	/** LIGHT - node without the full transaction history */
	3: 'LIGHT',
	[-1]: 'UNRECOGNIZED',
};

const statusList = {
	0: 'RUNNING',
	1: 'OUT_OF_SYNC',
	2: 'WAITING_FOR_PEERS',
	3: 'STARTING',
	[-1]: 'UNRECOGNIZED',
};
