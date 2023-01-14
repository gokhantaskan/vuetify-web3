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
  <div class="tw-container">
    <header class="tw-flex tw-items-center tw-justify-between tw-gap-4">
      <!-- Title -->
      <div class="tw-flex-1">
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          <h1 class="tw-text-3xl md:tw-text-4xl">
            {{ title }}
          </h1>
        </template>
      </div>
      <!-- Actions -->
      <template v-if="$slots.actions">
        <div>
          <slot name="actions" />
        </div>
      </template>
    </header>
    <slot />
  </div>
</template>
