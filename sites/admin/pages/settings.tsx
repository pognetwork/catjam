import { Layout } from '../components/layout';
import { withAdmin } from '../state';

export const Settings = withAdmin(() => (
	<Layout>
		<div>
			<h1>Settings</h1>
		</div>
	</Layout>
));
