<script setup lang="ts">
import { mdiLogin } from "@mdi/js";
import { storeToRefs } from "pinia";

import { useBreakpoints } from "@/composables/useBreakpoints";
import { useAppStore } from "@/stores/app";

defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
});

const { isMobile } = useBreakpoints();
const { connectingToDapp } = storeToRefs(useAppStore());
const { connectToDapp } = useAppStore();
</script>

<template>
  <template v-if="!icon">
    <v-btn
      :loading="connectingToDapp"
      variant="tonal"
      :prepend-icon="mdiLogin"
      @click="connectToDapp"
    >
      Connect Wallet
    </v-btn>
  </template>
  <!-- Icon Btn -->
  <template v-else>
    <v-tooltip text="Connect">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :loading="connectingToDapp"
          :icon="isMobile"
          :size="isMobile ? 'small' : undefined"
          variant="tonal"
          @click="connectToDapp"
        >
          <v-icon :icon="mdiLogin"></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
</template>
