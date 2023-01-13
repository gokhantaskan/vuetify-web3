import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { computed } from "vue";

import { rpcUrls } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";

export function useWeb3Provider() {
  const appStore = useAppStore();

  const web3Provider = computed(() => {
    if (appStore.provider) return new Web3Provider(appStore.provider);
    return null;
  });

  const jsonRPCProvider = computed<JsonRpcProvider | null>(() => {
    if (appStore.chainId) return new JsonRpcProvider(rpcUrls[appStore.chainId]);
    return null;
  });

  return {
    web3Provider,
    jsonRPCProvider,
  };
}
