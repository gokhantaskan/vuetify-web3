import { describe, expect, it, test } from "vitest";

import { trimText } from "@/utils/trim_text";

describe("trimText", () => {
  it("test cases", () => {
    expect(trimText("hello.eth")).toEqual("...");

    expect(trimText("0xabcdef12345abcdef12345abcde12345abcde123")).toEqual(
      "0xabcd...e123"
    );
  });
});
