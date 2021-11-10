import { Select } from '../../../components/select';
import { Layout } from '../components/layout';
import styles from './settings.module.scss';

export const Settings = () => (
	<Layout className={styles.layout}>
		<div className={styles.box}>
			<h1>Settings</h1>
			<ul>
				<li>
					<div>
						<h2>Chain</h2>
						<p>
							Select which chain to use. Defaults to <code>dev</code>
						</p>
					</div>
					<div>
						<Select>
							<option>Dev</option>
						</Select>
					</div>
				</li>
				<li>
					<div>
						<h2>Node</h2>
						<p>
							Select which node to connect to. Defaults to{' '}
							<code>node.pog.network</code>
						</p>
					</div>
					<div>
						<Select>
							<option>node.pog.network</option>
						</Select>
					</div>
				</li>
			</ul>
		</div>
	</Layout>
);
