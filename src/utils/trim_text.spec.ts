import { describe, expect, it } from "vitest";

import { trimText } from "@/utils/trim_text";

describe("trimText", () => {
  it("test cases", () => {
    expect(trimText("length<=10")).toEqual("...");

    expect(trimText("0xabcdef12345abcdef12345abcde12345abcde123")).toEqual(
      "0xabcd...e123"
    );
  });
});
