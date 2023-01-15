<script setup lang="ts">
import { mdiClose } from "@mdi/js";

export interface IDialogProps {
  title?: string;
}

withDefaults(defineProps<IDialogProps>(), {
  title: "Dialog Title",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <v-card elevation="2">
    <template v-if="title">
      <!-- Dialog Title -->
      <div
        class="tw-border-b tw-border-slate-500 tw-p-4 tw-flex tw-items-center tw-justify-between tw-gap-4"
      >
        <div class="tw-flex-1">
          <slot name="title">
            <h2 class="tw-text-xl md:tw-text-2xl">{{ title }}</h2>
          </slot>
        </div>
        <v-btn
          icon
          variant="tonal"
          color="danger"
          size="small"
          @click="handleClose"
        >
          <v-icon :icon="mdiClose"></v-icon>
        </v-btn>
      </div>
    </template>
    <!-- Dialog Content -->
    <div class="tw-p-4 tw-max-h-[75vh] tw-overflow-y-auto tw-space-y-4">
      <slot />
    </div>
    <!-- Dialog Actions -->
    <template v-if="$slots.actions">
      <div
        class="tw-border-t tw-border-slate-500 tw-p-4 tw-flex tw-items-center tw-justify-end"
      >
        <slot name="actions" />
      </div>
    </template>
  </v-card>
</template>
