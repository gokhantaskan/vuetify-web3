import { useBreakpoints as useBp } from "@vueuse/core";

import { BREAKPOINTS } from "../config/ui.js";

export function useBreakpoints() {
  const breakpoints = useBp(BREAKPOINTS);

  const isMobile = breakpoints.smaller("md");
  const isDesktop = breakpoints.greaterOrEqual("md");

  return { breakpoints, isMobile, isDesktop };
}
