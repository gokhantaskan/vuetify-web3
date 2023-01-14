<script setup lang="ts">
import { mdiClose } from "@mdi/js";

export interface IDialogProps {
  title?: string;
  wrapperClass?: string | string[] | Record<string, boolean>;
}

withDefaults(defineProps<IDialogProps>(), {
  title: "Dialog Title",
  wrapperClass: undefined,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleClose = () => {
  emit("close");
};
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <v-card
    elevation="2"
    :class="wrapperClass"
  >
    <template v-if="title">
      <!-- Dialog Title -->
      <div
        class="tw-border-b tw-border-slate-500 tw-p-4 tw-flex tw-items-center tw-justify-between tw-gap-4"
      >
        <div class="tw-flex-1">
          <slot name="title">
            <h2>{{ title }}</h2>
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
