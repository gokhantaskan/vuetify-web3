<script setup lang="ts">
import { useOnboard } from "@web3-onboard/vue";
import { computed, ref } from "vue";

import { trimText } from "@/utils/trim_text";

const {
  connectWallet,
  connectingWallet,
  connectedWallet,
  alreadyConnectedWallets,
  disconnectConnectedWallet,
} = useOnboard();

const ens = computed(() => connectedWallet.value?.accounts[0].ens?.name);
const address = computed(() => connectedWallet.value?.accounts[0].address);

const dialog = ref(false);

const connect = async () => {
  if (!alreadyConnectedWallets.value.length) await connectWallet();
};

const disconnect = async () => {
  await disconnectConnectedWallet();
};
</script>

<template>
  <template v-if="!connectedWallet">
    <v-btn
      :loading="connectingWallet"
      variant="tonal"
      @click="connect"
    >
      Connect
    </v-btn>
  </template>
  <template v-else>
    <v-btn-group density="compact">
      <v-btn
        variant="plain"
        color="white"
        @click="() => (dialog = true)"
      >
        {{ ens || trimText(address || "") }}
      </v-btn>
      <v-btn
        color="danger"
        variant="tonal"
        @click="disconnect"
      >
        Disconnect
      </v-btn>
    </v-btn-group>
  </template>
  <v-dialog-base v-model="dialog">
    <v-card class="tw-p-4 tw-text-center">
      <div class="tw-space-y-4">
        <template v-if="ens">
          <p class="tw-text-xl tw-font-medium">{{ ens }}</p>
          <p>{{ trimText(address || "") }}</p>
        </template>
        <template v-else>
          <p class="tw-text-xl tw-font-medium">{{ trimText(address || "") }}</p>
        </template>
      </div>
    </v-card>
  </v-dialog-base>
</template>
