import { grpc } from '@improbable-eng/grpc-web';

// we need this import since vite doesn't prebundle proto otherwise
import '@pognetwork/proto';

import { GrpcWebImpl, BlockClientImpl } from '@pognetwork/proto/node/rpc/block';
import { NodeUserClientImpl } from '@pognetwork/proto/node/rpc/node_user';
import { NodeAdminClientImpl } from '@pognetwork/proto/node/rpc/node_admin';
import { NodeWalletManagerClientImpl } from '@pognetwork/proto/node/rpc/node_wallet_manager';

const unauthenticatedRPC = (endpoint: string) =>
	new GrpcWebImpl(endpoint, {
		debug: false,
	});

const authenticatedRPC = (endpoint: string, token: string) =>
	new GrpcWebImpl(endpoint, {
		debug: false,
		metadata: new grpc.Metadata({ Authorization: token }),
	});

export const createUserClient = (endpoint: string) =>
	new NodeUserClientImpl(unauthenticatedRPC(endpoint));

export const createBlockClient = (endpoint: string) =>
	new BlockClientImpl(unauthenticatedRPC(endpoint));

export const createAdminClient = (endpoint: string, token: string) =>
	new NodeAdminClientImpl(authenticatedRPC(endpoint, token));

export const createWalletManagerClient = (endpoint: string, token: string) =>
	new NodeWalletManagerClientImpl(authenticatedRPC(endpoint, token));

export {
	NodeUserClientImpl,
	BlockClientImpl,
	NodeAdminClientImpl,
	NodeWalletManagerClientImpl,
};
