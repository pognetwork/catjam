import { Layout } from '../components/layout';
import { withAdmin } from '../state';

export const Index = withAdmin(() => (
	<Layout>
		<div>
			<h1>Dashboard</h1>
		</div>
	</Layout>
));
