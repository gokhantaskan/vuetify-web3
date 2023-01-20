import { useOnboard } from "@web3-onboard/vue";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

import { DEFAULT_NETWORK } from "@/constants/blockchain/supported_networks";
import { hexToNumber } from "@/utils/format";

export const useAppStore = defineStore("app", () => {
  const {
    connectedChain,
    connectWallet,
    connectingWallet,
    connectedWallet,
    alreadyConnectedWallets,
    disconnectConnectedWallet,
  } = useOnboard();

  const provider = computed(() => connectedWallet.value?.provider);
  const connectingToDapp = computed(() => connectingWallet.value);
  const wallet = computed(() => ({
    label: connectedWallet.value?.label,
    icon: connectedWallet.value?.icon,
    instance: connectedWallet.value?.instance,
  }));
  const address = computed(
    () => connectedWallet.value?.accounts[0].address || ""
  );
  const chainId = computed(
    () => hexToNumber(connectedChain.value?.id ?? "") || DEFAULT_NETWORK
  );

  // ? Force re-render of components on top of the app
  const renderKey = ref(0);
  const ens = ref<string | null>(null);

  async function connectToDapp() {
    if (!alreadyConnectedWallets.value.length) await connectWallet();
  }

  async function disconnectFromDapp() {
    await disconnectConnectedWallet();
  }

  async function setEns(ensName?: string | null) {
    if (!ensName) ens.value = null;
    else ens.value = ensName;
  }

  return {
    // State
    ens: readonly(ens),
    renderKey,
    // Getters
    connectingToDapp,
    provider,
    wallet,
    chainId,
    address,
    // Functions
    connectToDapp,
    disconnectFromDapp,
    setEns,
  };
});
