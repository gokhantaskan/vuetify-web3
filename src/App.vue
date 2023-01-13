<script setup lang="ts">
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useOnboard } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";
import { storeToRefs } from "pinia";
import { onMounted, ref, unref, watch } from "vue";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet.vue";

import { useWeb3Provider } from "./composables/useWeb3Provider";
import { useAppStore } from "./stores/app";
import { useBalancesStore } from "./stores/balances";

/**
 * Web3 Onboard
 */
const injected = injectedModule();
const walletConnect = walletConnectModule();

init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: 1,
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://eth-rpc.gateway.pokt.network",
      blockExplorerUrl: "https://etherscan.io",
    },
    {
      id: 137,
      token: "MATIC",
      label: "Polygon Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
      blockExplorerUrl: "https://polygonscan.com",
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
  appMetadata: {
    name: "Application",
    description: "Vite + Vuetify + Tailwind + Web3 Onboard Application",
    icon: "<svg></svg>",
  },
});

/**
 * State
 * ! `useOnboard` should come after `init` to initialize the hooks properly
 */
const appStore = useAppStore();
const { address, chainId } = storeToRefs(appStore);
const { web3Provider } = useWeb3Provider();
const { getEthBalance, resetEthBalance } = useBalancesStore();
const { connectWallet, alreadyConnectedWallets } = useOnboard();

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
      <div class="tw-container tw-mx-auto">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>
