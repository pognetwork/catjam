import { Layout } from '../components/layout';
import { withAdmin } from '../hooks/admin';

export const Wallets = withAdmin(() => (
	<Layout>
		<div>
			<h1>Wallets</h1>
		</div>
	</Layout>
));
