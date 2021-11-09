import { grpc } from '@improbable-eng/grpc-web';

import {
	GrpcWebImpl,
	BlockClientImpl,
} from '@pognetwork/champ-proto/rpc/block';
import { NodeUserClientImpl } from '@pognetwork/champ-proto/rpc/node_user';
import { NodeAdminClientImpl } from '@pognetwork/champ-proto/rpc/node_admin';
import { NodeWalletManagerClientImpl } from '@pognetwork/champ-proto/rpc/node_wallet_manager';

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
