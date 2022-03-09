import { isValidElement } from 'react';
import { Link as SnowstormLink } from '@snowstorm/core';
import { useAdmin } from '../state';

export const AuthenticatedLink: typeof SnowstormLink = ({
	children,
	...props
}) => {
	const admin = useAdmin();

	if (admin.status === 'unauthenticated' && !import.meta.env.SSR) {
		return isValidElement(children) ? (
			children
		) : (
			// eslint-disable-next-line react/jsx-no-target-blank
			<a {...props} onClick={e => e.preventDefault()}>
				{children}
			</a>
		);
	}

	return <SnowstormLink {...props}>{children}</SnowstormLink>;
};
