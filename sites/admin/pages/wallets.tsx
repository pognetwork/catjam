import { Layout } from '../components/layout';
import { withAdmin } from '../state';

export const Wallets = withAdmin(() => (
	<Layout>
		<div>
			<h1>Wallets</h1>
		</div>
	</Layout>
));
