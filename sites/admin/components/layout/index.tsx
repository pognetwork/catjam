import React, { ReactNode, useEffect } from 'react';
import { Link, useLocation } from '@snowstorm/core';

import '../../../../assets/global.scss';
import logo from '../../../../assets/pog.svg';
import styles from './index.module.scss';

import {
	globeIcon,
	logoutIcon,
	sendIcon,
	settingsIcon,
} from './../../../../assets/icons';
import { useAdmin } from '../../state';
import { NoSSR } from '../../../../utils/no-ssr';
import { AuthenticatedLink } from '../authenticated-link';

const sidebarLinks = [
	{
		name: 'Dashboard',
		url: '/',
		icon: globeIcon,
	},
	{
		name: 'Settings',
		url: '/settings',
		icon: settingsIcon,
	},
	{
		name: 'Wallets',
		url: '/wallets',
		icon: sendIcon,
	},
	{
		name: 'Blocks',
		url: '/blocks',
		icon: sendIcon,
	},
];

export const Layout = ({
	children,
	className,
	noSSR = false,
}: {
	className?: string;
	children: ReactNode;
	noSSR?: boolean;
}) => {
	const [loc] = useLocation();
	const { logout } = useAdmin();

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<AuthenticatedLink href="/">
					<img height="30" width="30" className={styles.logo} src={logo} />
				</AuthenticatedLink>
				<div className={styles.sidebarTop}>
					{sidebarLinks.map(sidebar => (
						<AuthenticatedLink
							key={sidebar.name}
							className={`${styles.sidebarLink} ${
								(loc.endsWith(sidebar.url) && styles.active) || ''
							}`}
							href={sidebar.url}
						>
							{sidebar.icon}
							<p>{sidebar.name}</p>
						</AuthenticatedLink>
					))}
					<Link
						href="/login"
						className={`${styles.sidebarLink} ${styles.logout}`}
						onClick={logout}
					>
						{logoutIcon}
						<p />
					</Link>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.header} />
				<div className={`${styles.children} ${className}`}>
					{noSSR ? <NoSSR>{children}</NoSSR> : children}
				</div>
			</div>
		</div>
	);
};
