export function numberToHex(hex: number): string {
  return hex.toString(16);
}

export function hexToNumber(hex: string): number {
  return parseInt(hex, 16);
}
