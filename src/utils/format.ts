import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";

export function numberToHex(hex: number): string {
  return `0x${hex.toString(16)}`;
}

export function hexToNumber(hex: string): number {
  return parseInt(hex, 16);
}

export function bigNumberToTrimmed(
  balance: BigNumber,
  decimals = 18,
  fixed = 4
): string {
  if (!(balance instanceof BigNumber)) {
    throw new Error(
      `"Invalid balance type: ${typeof balance}. Should be BigNumber.`
    );
  }

  if (balance.isZero()) {
    return "0";

    // TODO: implement `fixed` here, don't change it for now
  } else if (BigNumber.from(parseUnits("0.0001", decimals)).gt(balance)) {
    return "< 0.0001";
  } else {
    const [l, r] = formatUnits(balance.toString()).split(".");
    return parseFloat(`${l}.${r?.slice(0, fixed) ?? 0}`)
      .toString()
      .replace(/0+$/, "");
  }
}

window.numberToHex = numberToHex;
window.hexToNumber = hexToNumber;
