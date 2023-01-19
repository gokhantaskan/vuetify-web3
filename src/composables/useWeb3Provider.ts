import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { computed } from "vue";

import { RPC_URLS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";

export function useWeb3Provider() {
  const appStore = useAppStore();

  const web3Provider = computed(() => {
    if (appStore.provider) return new Web3Provider(appStore.provider);
    return null;
  });

  const jsonRPCProvider = computed<JsonRpcProvider | null>(() => {
    if (!RPC_URLS[appStore.chainId]) return null;

    try {
      return new JsonRpcProvider(RPC_URLS[appStore.chainId]);
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
