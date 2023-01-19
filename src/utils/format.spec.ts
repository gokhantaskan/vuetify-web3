import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { describe, expect, it } from "vitest";

import { bigNumberToTrimmed, hexToNumber, numberToHex } from "@/utils/format";

describe("hexToNumber", () => {
  it("test cases", () => {
    expect(hexToNumber("0x1")).toEqual(1);
    expect(hexToNumber("0x38")).toEqual(56);
    expect(hexToNumber("0x89")).toEqual(137);
  });
});

describe("numberToHex", () => {
  it("test cases", () => {
    expect(numberToHex(1)).toEqual("0x1");
    expect(numberToHex(56)).toEqual("0x38");
    expect(numberToHex(137)).toEqual("0x89");
  });
});

describe("bigNumberToTrimmed", () => {
  it("test cases", () => {
    expect(bigNumberToTrimmed(BigNumber.from("0"))).toEqual("0");
    expect(bigNumberToTrimmed(BigNumber.from("1"))).toEqual("< 0.0001");
    expect(bigNumberToTrimmed(BigNumber.from("100000000000000"))).toEqual(
      "0.0001"
    );
    expect(bigNumberToTrimmed(BigNumber.from("1000000000000000000"))).toEqual(
      "1"
    );
    expect(
      bigNumberToTrimmed(BigNumber.from("1000000000000000000000"))
    ).toEqual("1,000");
    expect(
      bigNumberToTrimmed(
        BigNumber.from(parseUnits(formatUnits("123456789", 4), 18))
      )
    ).toEqual("12,345.6789");
  });
});
