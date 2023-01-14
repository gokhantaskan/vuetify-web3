<script setup lang="ts">
import "@/plugins/onboard";

import { useOnboard } from "@web3-onboard/vue";
import { onMounted, ref, watchEffect } from "vue";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet.vue";
import { useWeb3Provider } from "@/composables/useWeb3Provider";

const drawer = ref<boolean>(false);

const { connectWallet, alreadyConnectedWallets, connectedWallet } =
  useOnboard();

const { jsonRPCProvider } = useWeb3Provider();

onMounted(async () => {
  if (alreadyConnectedWallets.value.length) {
    await connectWallet({
      autoSelect: {
        label: alreadyConnectedWallets.value[0],
        disableModals: false,
      },
    });
  }
});

watchEffect(() => {
  console.log("wallet", connectedWallet.value);
  console.log("jsonRPCProvider", jsonRPCProvider.value);
});
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-spacer></v-spacer>
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
      <router-view />
    </v-main>
  </v-app>
</template>
