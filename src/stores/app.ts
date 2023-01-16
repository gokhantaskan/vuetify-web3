import { useOnboard } from "@web3-onboard/vue";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { DEFAULT_NETWORK } from "@/constants/blockchain/supported_networks";
import { hexToNumber } from "@/utils/format";

export const useAppStore = defineStore("app", () => {
  const { connectedWallet, connectedChain } = useOnboard();

  const provider = computed(() => connectedWallet.value?.provider);
  const ens = computed(
    () => connectedWallet.value?.accounts[0].ens?.name || ""
  );
  const address = computed(
    () => connectedWallet.value?.accounts[0].address || ""
  );
  const chainId = computed(
    // ! can be NaN
    () => hexToNumber(connectedChain.value?.id ?? "") || DEFAULT_NETWORK
  );
  const renderKey = ref(0);

  function renderApp() {
    renderKey.value++;
  }

  return {
    provider,
    chainId,
    ens,
    address,
    renderKey,
    renderApp,
  };
});
