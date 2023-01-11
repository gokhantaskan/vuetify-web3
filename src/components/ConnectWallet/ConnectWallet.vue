<script setup lang="ts">
import { useOnboard } from "@web3-onboard/vue";
import { computed } from "vue";

import { trimText } from "@/utils/trim_text";

const {
  connectWallet,
  connectingWallet,
  connectedWallet,
  alreadyConnectedWallets,
  disconnectConnectedWallet,
} = useOnboard();

const account = computed(
  () =>
    connectedWallet.value?.accounts[0].ens?.name ??
    trimText(connectedWallet.value?.accounts[0].address || "")
);

const connect = async () => {
  if (!alreadyConnectedWallets.value.length) await connectWallet();
};

const disconnect = async () => {
  await disconnectConnectedWallet();
};
</script>

<template>
  <div>
    <template v-if="!connectedWallet">
      <v-btn
        :loading="connectingWallet"
        @click="connect"
      >
        Connect
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        color="danger"
        @click="disconnect"
      >
        Disconnect
      </v-btn>
      <span class="tw-inline-block tw-ml-4">{{ account }}</span>
    </template>
  </div>
</template>
