import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { RPC_URLS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";

export function useWeb3Provider() {
  const { provider, chainId } = storeToRefs(useAppStore());

  const web3Provider = computed(() => {
    if (!provider.value) return null;

    try {
      return new Web3Provider(provider.value);
    } catch (e: any) {
      console.error("Error creating Web3Provider", e);
      return null;
    }
  });

  const jsonRPCProvider = computed<JsonRpcProvider | null>(() => {
    if (!RPC_URLS[chainId.value]) return null;

    try {
      return new JsonRpcProvider(RPC_URLS[chainId.value]);
    } catch (e: any) {
      console.error("Error creating JsonRpcProvider", e);
      return null;
    }
  });

  return {
    web3Provider,
    jsonRPCProvider,
  };
}
