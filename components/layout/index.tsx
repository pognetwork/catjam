import React, { FC } from 'react';

import './global.scss';
import styles from './index.module.scss';

import logo from './pog.svg';

export const Layout: FC<{ className: string }> = ({ children, className }) => (
	<div className={styles.layout}>
		<div className={styles.sidebar}>
			<img className={styles.logo} src={logo} />
		</div>
		<div className={styles.main}>
			<div className={styles.header}>
				<img className={styles.logo} src={logo} />
				<h1>pog.network wallet</h1>
			</div>
			<div className={`${styles.children} ${className}`}>{children}</div>
		</div>
	</div>
);
