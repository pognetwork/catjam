import React from 'react';
import { WalletProvider } from '../state';

export default ({ children }: { children: React.ReactNode }) => (
	<WalletProvider>{children}</WalletProvider>
);
