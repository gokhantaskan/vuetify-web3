import { Web3Provider } from "@ethersproject/providers";
import { useOnboard } from "@web3-onboard/vue";
import { debounce } from "lodash";
import { defineStore } from "pinia";
import { computed, readonly, ref, watch } from "vue";

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

  watch(
    [provider, address, chainId],
    debounce(
      async ([provider, address]) => {
        if (provider) {
          const web3Provider = new Web3Provider(provider);

          try {
            ens.value = await web3Provider?.lookupAddress(address);
          } catch (e: any) {
            ens.value = null;
            console.error("ENS error: ", e);
          }
        }
      },
      250,
      { leading: false, trailing: true }
    )
  );

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
  };
});
