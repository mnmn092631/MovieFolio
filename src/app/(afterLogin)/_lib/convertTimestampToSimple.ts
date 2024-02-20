export default function convertTimestampToSimple(timestamp: string) {
	const simple = timestamp.slice(0, 19).replace("T", " ");
	return simple;
}
