import React, { FC } from 'react';
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
];

export const Layout: FC<{ className?: string }> = ({ children, className }) => {
	const [loc] = useLocation();

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<Link href="/">
					<img height="30" width="30" className={styles.logo} src={logo} />
				</Link>
				<div className={styles.sidebarTop}>
					{sidebarLinks.map(sidebar => (
						<Link
							key={sidebar.name}
							className={`${styles.sidebarLink} ${
								(loc.endsWith(sidebar.url) && styles.active) || ''
							}`}
							href={sidebar.url}
						>
							{sidebar.icon}
							<p>{sidebar.name}</p>
						</Link>
					))}
					<Link
						className={`${styles.sidebarLink} ${styles.logout}`}
						href="/login"
					>
						{logoutIcon}
						<p></p>
					</Link>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.header} />
				<div className={`${styles.children} ${className}`}>{children}</div>
			</div>
		</div>
	);
};