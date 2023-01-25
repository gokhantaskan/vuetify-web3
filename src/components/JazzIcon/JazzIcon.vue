<script setup lang="ts">
import { onMounted, ref } from "vue";
import Jazzicon from "vue3-jazzicon/src/components";

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

defineProps({
  address: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
  },
});
</script>

<template>
  <Jazzicon
    v-if="isMounted"
    class="jazzicon"
    :address="address"
    :diameter="size"
  />
</template>

<style scoped lang="scss">
.jazzicon {
  @apply tw-overflow-hidden tw-inline-flex tw-items-center tw-justify-center tw-rounded-full;

  :deep(div) {
    @apply tw-scale-105;
  }
}
</style>
