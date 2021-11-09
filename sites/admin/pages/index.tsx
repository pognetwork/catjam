import { Layout } from '../components/layout';
import { withAdmin } from '../hooks/admin';

export const Index = withAdmin(() => (
	<Layout>
		<div>
			<h1>Dashboard</h1>
		</div>
	</Layout>
));
