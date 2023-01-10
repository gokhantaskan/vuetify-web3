<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <div class="layout layout--base">
    <header class="layout__header">
      <component :is="'h1'">
        {{ title }}
      </component>
    </header>
    <slot />
  </div>
</template>
