export const parseJWT = <T>(jwt: string): T | undefined => {
	let x: T | undefined;
	try {
		x = JSON.parse(atob(jwt.split('.')[1]));
	} catch {}

	return x;
};
