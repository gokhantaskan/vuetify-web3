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
    class="tw-inline-flex"
    :address="address"
    :diameter="size"
  />
</template>
