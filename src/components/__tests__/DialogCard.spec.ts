// import { mount } from "@vue/test-utils";
import { assert, test } from "vitest";

test.skip("skipped test", () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3);
});

// import DialogCard from "../DialogCard/DialogCard.vue";

// describe("DialogCard", () => {
//   it("renders properly", () => {
//     const wrapper = mount(DialogCard, { props: { msg: "Hello Vitest" } });
//     expect(wrapper.text()).toContain("Hello Vitest");
//   });
// });
