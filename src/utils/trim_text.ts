export function trimText(txt: string): string {
  return txt.slice(0, 6) + "..." + txt.slice(-4);
}
