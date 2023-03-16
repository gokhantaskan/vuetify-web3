import { computed } from "vue";

export function useModelWrapper(
  props: Record<string, any>,
  emit: (event: string, ...args: any[]) => void,
  name = "modelValue",
) {
  return computed({
    get: () => props[name],
    set: value => emit(`update:${name}`, value),
  });
}
