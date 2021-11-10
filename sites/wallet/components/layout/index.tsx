import React, { FC } from 'react';
import { Link, useLocation } from '@snowstorm/core';

import './../../../../assets/global.scss';
import logo from './../../../../assets/pog.svg';
import styles from './index.module.scss';
import {
	codeIcon,
	globeIcon,
	messageIcon,
	sendIcon,
	settingsIcon,
} from './../../../../assets/icons';

const sidebarLinks = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: globeIcon,
		mobile: true,
	},
	{
		name: 'Transaction',
		url: '/dashboard/tx',
		icon: sendIcon,
		mobile: false,
	},
	{
		name: 'Messages',
		url: '/dashboard/messages',
		icon: messageIcon,
		mobile: false,
	},
	{
		name: 'Contracts',
		url: '/dashboard/aacs',
		icon: codeIcon,
		mobile: false,
	},
];

export const Layout: FC<{ className?: string }> = ({ children, className }) => {
	const [loc] = useLocation();

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<Link href="/">
					<img height="51" width="51" className={styles.logo} src={logo} />
				</Link>
				<div className={styles.sidebarTop}>
					{sidebarLinks.map(sidebar => (
						<Link
							key={sidebar.name}
							className={`${styles.sidebarLink} ${
								(loc.endsWith(sidebar.url) && styles.active) || ''
							} ${(sidebar.mobile && `__show_sm`) || ''}`}
							href={sidebar.url}
						>
							{sidebar.icon}
							<p>{sidebar.name}</p>
						</Link>
					))}
					<div className={styles.sidebarHr} />
					<Link
						className={`${styles.sidebarLink} ${
							(loc.endsWith('settings') && styles.active) || ''
						} __show_sm`}
						href="/settings"
					>
						{settingsIcon}
						<p>Settings</p>
					</Link>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.header} />
				<div className={`${styles.children} ${className}`}>{children}</div>
				<div className={styles.footer}>
					<a
						href="https://pog.network/impressum/"
						target="_blank"
						referrerPolicy="no-referrer"
						rel="noreferrer"
					>
						legal notice/privacy policy
					</a>
				</div>
			</div>
		</div>
	);
};
