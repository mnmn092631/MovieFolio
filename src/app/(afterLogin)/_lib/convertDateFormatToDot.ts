export default function convertDateFormatToDot(dateStr: string) {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const date = dateStr.slice(6, 8);
  return `${year}. ${month}. ${date}.`;
}
