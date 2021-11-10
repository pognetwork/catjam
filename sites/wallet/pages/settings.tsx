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
						<p>Select which chain to use. Defaults to `dev`</p>
					</div>
					<div>
						<p>Yeet</p>
					</div>
				</li>
				<li>
					<div>
						<h2>Chain</h2>
						<p>
							Select which node to connect to. Defaults to `node.pog.network`
						</p>
					</div>
					<div>
						<p>Yeet</p>
					</div>
				</li>
			</ul>
		</div>
	</Layout>
);
