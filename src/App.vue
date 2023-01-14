<script setup lang="ts">
import "@/plugins/onboard";

import { useOnboard } from "@web3-onboard/vue";
import { storeToRefs } from "pinia";
import { onMounted, ref, unref, watch } from "vue";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet.vue";
import NetworkDialog from "@/components/NetworkDialog/NetworkDialog.vue";

import { useWeb3Provider } from "./composables/useWeb3Provider";
import { useAppStore } from "./stores/app";
import { useBalancesStore } from "./stores/balances";

const { connectWallet, alreadyConnectedWallets } = useOnboard();

const { web3Provider } = useWeb3Provider();
const { address, chainId } = storeToRefs(useAppStore());
const { getEthBalance, resetEthBalance } = useBalancesStore();

const drawer = ref<boolean>(false);

onMounted(async () => {
  if (
    JSON.parse(localStorage.getItem("alreadyConnectedWallets") || "[]").length
  ) {
    await connectWallet({
      autoSelect: {
        label: alreadyConnectedWallets.value[0],
        disableModals: false,
      },
    });
  }
});

watch([address, chainId], async ([address, chainId]) => {
  const provider = unref(web3Provider);

  if (typeof address === "string" && !isNaN(chainId) && provider) {
    getEthBalance(provider, address);
  }

  if (!provider || isNaN(chainId)) {
    resetEthBalance();
  }
});
</script>

<template>
  <v-app>
    <v-app-bar
      :elevation="2"
      :style="{ zIndex: 80 }"
    >
      <v-app-bar-nav-icon
        @click="() => (drawer = !drawer)"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="tw-mr-[10px] tw-space-x-4">
        <NetworkDialog />
        <ConnectWallet />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :style="{ zIndex: 79 }"
    >
    </v-navigation-drawer>
    <v-main :scrollable="true">
      <router-view />
    </v-main>
  </v-app>
</template>
