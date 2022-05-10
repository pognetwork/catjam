import React from 'react';
import { AdminProvider } from '../state';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default ({ children }: { children: React.ReactElement }) => (
	<QueryClientProvider client={queryClient}>
		<AdminProvider>{children}</AdminProvider>
	</QueryClientProvider>
);
