import React, { FC } from 'react';

import './global.scss';
import styles from './index.module.scss';

import logo from './pog.svg';

export const Layout: FC = ({ children }) => (
	<div className={styles.layout}>
		<div className={styles.sidebar}>
			<img className={styles.logo} src={logo} />
		</div>
		<div className={styles.main}>{children}</div>
	</div>
);
