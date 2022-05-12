import React from 'react';
import { WalletProvider } from '../state';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default ({ children }: { children: React.ReactElement }) => (
	<QueryClientProvider client={queryClient}>
		<WalletProvider>{children}</WalletProvider>
	</QueryClientProvider>
);
