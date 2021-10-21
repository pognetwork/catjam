import React, { FC } from 'react';
import { Link } from '@snowstorm/core';

import './global.scss';
import logo from './pog.svg';
import styles from './index.module.scss';

export const Layout: FC<{ className: string }> = ({ children, className }) => (
	<div className={styles.layout}>
		<div className={styles.sidebar}>
			<Link href="/">
				<img className={styles.logo} src={logo} />
			</Link>
		</div>
		<div className={styles.main}>
			<div className={styles.header}>
				<img className={styles.logo} src={logo} />
				<h1>pog.network wallet</h1>
			</div>
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
