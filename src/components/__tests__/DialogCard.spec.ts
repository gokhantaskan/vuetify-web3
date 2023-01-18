import { mount } from "@vue/test-utils";
import { describe, expect, it, test } from "vitest";

import DialogCard from "@/components/DialogCard/DialogCard.vue";

test.skip("", () => {
  describe("DialogCard", () => {
    it("renders properly", () => {
      const wrapper = mount(DialogCard, { props: { title: "Hello Vitest" } });
      expect(wrapper.text()).toContain("Hello Vitest");
    });
  });
});
