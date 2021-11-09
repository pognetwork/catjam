import React from 'react';
import { AdminProvider } from '../state';
export default ({ children }: { children: React.ReactNode }) => (
	<AdminProvider>{children}</AdminProvider>
);
