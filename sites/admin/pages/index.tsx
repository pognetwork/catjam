import { Layout } from '../components/layout';
import { useAdmin } from '../state';

export const Index = () => {
	const admin = useAdmin();
	return (
		<Layout>
			<div>
				<h1>
					Welcome <span>{admin.jwtData?.username}</span>!
				</h1>
			</div>
		</Layout>
	);
};
