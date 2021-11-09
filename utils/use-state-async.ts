import { useCallback, useEffect, useRef, useState } from 'react';

export function useStateAsync<T>(
	initialState: T,
): [T, (x: T) => Promise<void>] {
	const [state, setState] = useState<T>(initialState);
	const resolverRef = useRef(null);

	useEffect(() => {
		if (resolverRef.current) {
			resolverRef.current(state);
			resolverRef.current = null;
		}
	}, [state]);

	const handleSetState = useCallback(
		async (stateAction: T): Promise<void> => {
			setState(stateAction);
			return new Promise(resolve => {
				resolverRef.current = resolve;
			});
		},
		[setState],
	);

	return [state, handleSetState];
}
