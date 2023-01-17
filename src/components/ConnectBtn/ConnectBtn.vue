<script setup lang="ts">
import { mdiLogin } from "@mdi/js";

import { useAppStore } from "@/stores/app";

defineProps({
  onlyIcon: {
    type: Boolean,
    default: false,
  },
});

const { connectToDapp, connectingToDapp } = useAppStore();
</script>

<template>
  <template v-if="!onlyIcon">
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
          variant="tonal"
          @click="connectToDapp"
        >
          <v-icon :icon="mdiLogin"></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
</template>
