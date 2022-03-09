import { Layout } from '../components/layout';
import { useAdmin } from '../state';
import {
	GetBlockPoolSizeReply,
	GetChainReply,
	GetModeReply,
	GetNodeStatusReply,
	GetVersionResponse,
} from '@pognetwork/proto/node/rpc/node_admin';
import { useEffect, useState } from 'react';

export const Index = () => (
	<Layout noSSR>
		<IndexPage />
	</Layout>
);

const IndexPage = () => {
	const admin = useAdmin();

	const [version, setVersion] = useState<GetVersionResponse>(undefined);
	const [chain, setChain] = useState<GetChainReply>(undefined);
	const [mode, setMode] = useState<GetModeReply>(undefined);
	const [status, setStatus] = useState<GetNodeStatusReply>(undefined);
	const [blockPoolSize, setBlockPoolSize] =
		useState<GetBlockPoolSizeReply>(undefined);

	useEffect(() => {
		Promise.all([
			admin.api.nodeAdmin?.getVersion({}).then(v => setVersion(v)),
			admin.api.nodeAdmin?.getChain({}).then(c => setChain(c)),
			admin.api.nodeAdmin?.getMode({}).then(c => setMode(c)),
			admin.api.nodeAdmin?.getNodeStatus({}).then(c => setStatus(c)),
			admin.api.nodeAdmin?.getBlockPoolSize({}).then(c => setBlockPoolSize(c)),
		]).catch(console.error);
	}, [setVersion, admin.api.nodeAdmin]);

	return (
		<div>
			<h1>
				Welcome <span>{admin.jwtData?.username}</span>!
			</h1>
			<table>
				<tbody>
					<tr>
						<td>Version</td>
						<td>
							{version?.version
								? `champ v${version.version}`
								: 'failed to get version'}
						</td>
					</tr>
					<tr>
						<td>Chain</td>
						<td>
							{chain?.currentChain
								? chain?.currentChain
								: 'failed to get chain'}
						</td>
					</tr>
					<tr>
						<td>Mode</td>
						<td>
							{mode?.currentMode
								? modes[mode?.currentMode]
								: 'failed to get mode'}
						</td>
					</tr>
					<tr>
						<td>Status</td>
						<td>
							{status ? statusList[status?.status] : 'failed to get status'}
						</td>
					</tr>
					<tr>
						<td>BlockPool Size&nbsp;&nbsp;</td>
						<td>
							{blockPoolSize
								? blockPoolSize.length
								: 'failed to get block pool size'}
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
