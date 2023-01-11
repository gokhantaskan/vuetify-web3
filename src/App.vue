<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useOnboard } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";
import { onMounted, ref, watchEffect } from "vue";

import ConnectWallet from "./components/ConnectWallet/ConnectWallet.vue";

const drawer = ref<boolean>(false);
const overlay = ref<boolean>(false);
const injected = injectedModule();
const walletConnect = walletConnectModule();
const rpcUrl = "https://eth-rpc.gateway.pokt.network";

init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

// This should come after `init` to initialize the `useOnboard` hook
const {
  connectWallet,
  alreadyConnectedWallets,
  connectedWallet,
  connectedChain,
} = useOnboard();

onMounted(async () => {
  if (alreadyConnectedWallets.value.length) {
    overlay.value = true;

    await connectWallet({
      autoSelect: {
        label: alreadyConnectedWallets.value[0],
        disableModals: false,
      },
    });

    overlay.value = false;
  }
});

watchEffect(() => {
  console.log(connectedWallet.value);
  console.log(connectedChain.value);
});
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon :icon="mdiMagnify"></v-icon>
      </v-btn>
      <div class="tw-mr-[10px]">
        <ConnectWallet />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
    </v-navigation-drawer>
    <v-main :scrollable="true">
      <div class="tw-container tw-mx-auto">
        <router-view />
      </div>
    </v-main>
    <v-overlay
      :model-value="overlay"
      :close-on-content-click="false"
      class="tw-items-center tw-justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>
