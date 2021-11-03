import React, { FC } from 'react';
import { Link, useLocation } from '@snowstorm/core';

import './global.scss';
import logo from './pog.svg';
import styles from './index.module.scss';
import {
	codeIcon,
	globeIcon,
	messageIcon,
	sendIcon,
	settingsIcon,
} from '../icons';

const sidebarLinks = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: globeIcon,
	},
	{
		name: 'Transaction',
		url: '/dashboard/send',
		icon: sendIcon,
	},
	{
		name: 'Messages',
		url: '/dashboard/messages',
		icon: messageIcon,
	},
	{
		name: 'Contracts',
		url: '/dashboard/aacs',
		icon: codeIcon,
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
					<div className={styles.sidebarHr} />
					<Link
						className={`${styles.sidebarLink} ${
							(loc.endsWith('settings') && styles.active) || ''
						}`}
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
			</div>
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
	);
};
