export const storeAsFile = <T>(
	data: T,
	filename = 'pog-wallet',
	type = 'contentType/json',
) => {
	const a = document.createElement('a');

	let blob: Blob;
	if (typeof data === 'string') {
		blob = new Blob([data], { type });
	} else {
		blob = new Blob([JSON.stringify(data)], { type });
	}

	a.href = window.URL.createObjectURL(blob);
	a.download = filename;
	a.click();
};
