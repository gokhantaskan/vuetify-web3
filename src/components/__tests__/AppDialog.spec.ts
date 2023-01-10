import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AppDialog from "../AppDialog/AppDialog.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(AppDialog, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
