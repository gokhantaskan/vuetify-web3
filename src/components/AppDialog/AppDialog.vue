<script setup lang="ts">
import { mdiClose } from "@mdi/js";
import { computed } from "vue";

export interface IDialogProps {
  visible: boolean;
  title?: string;
  wrapperClass?: string | string[] | Record<string, boolean>;
}

const props = withDefaults(defineProps<IDialogProps>(), {
  visible: false,
  title: "Dialog Title",
  wrapperClass: undefined,
});

const emit = defineEmits(["update:visible", "close"]);

const isVisible = computed({
  get: () => props.visible,
  set: value => emit("update:visible", value),
});

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
  <v-dialog v-model="isVisible">
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
            <h2>{{ title }}</h2>
          </div>
          <v-btn
            icon
            variant="plain"
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
  </v-dialog>
</template>
