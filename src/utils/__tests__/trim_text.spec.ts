import { assert, test } from "vitest";
// import { trimText } from '../trim_text'

test.skip("skipped test", () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3);
});
