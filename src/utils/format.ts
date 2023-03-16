import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";

export function numberToHex(hex: number): string {
  return `0x${hex.toString(16)}`;
}

export function hexToNumber(hex: string): number {
  return parseInt(hex, 16);
}

/**
 *
 * @param balance Token balance in BigNumber format
 * @param decimals Token decimals
 * @param fixed The number of decimal places to show
 * @returns string representation of the balance
 */
export function bigNumberToTrimmed(
  balance: BigNumber,
  decimals = 18,
  fixed = 4,
): string {
  if (!(balance instanceof BigNumber)) {
    throw new Error(
      `"Invalid balance type: ${typeof balance}. Should be BigNumber.`,
    );
  }

  if (balance.isZero()) {
    return "0";
  } else if (
    BigNumber.from(parseUnits(formatUnits("1", fixed), decimals)).gt(balance)
  ) {
    return `< ${formatUnits("1", fixed)}`;
  } else {
    const [l, r] = formatUnits(balance.toString()).split(".");

    return Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: fixed,
    })
      .format(
        parseFloat(`${l}.${r?.slice(0, fixed + 1).replace(/0+$/, "") ?? 0}`),
      )
      .toString();
  }
}
