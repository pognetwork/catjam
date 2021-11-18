import React, { ReactElement, ReactNode } from 'react';

export const NoSSR = ({
	children,
	fallback = null,
}: {
	children: ReactNode;
	fallback?: ReactNode;
}): ReactElement => {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => !import.meta.env.SSR && setMounted(true), []);

	if (!mounted) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <React.Fragment>{fallback}</React.Fragment>;
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <React.Fragment>{children}</React.Fragment>;
};
