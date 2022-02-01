export default function storeAsFile<T>(
	data: T,
	filename = 'pog-wallet',
	type = 'contentType/json',
): void {
	const a = document.createElement('a');
	const blob = new Blob([JSON.stringify(data)], { type });
	a.href = window.URL.createObjectURL(blob);
	a.download = filename;
	a.click();
}
