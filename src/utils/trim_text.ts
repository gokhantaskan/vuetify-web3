export function trimText(txt: string): string {
  if (txt.length <= 10) return "...";
  return txt.slice(0, 6) + "..." + txt.slice(-4);
}
