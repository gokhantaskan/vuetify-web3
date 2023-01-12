import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { useOnboard } from "@web3-onboard/vue";
import { computed } from "vue";

import { rpcUrls } from "@/constants/blockchain";
import { hexToNumber } from "@/utils/format";

export function useWeb3Provider() {
  const { connectedWallet, connectedChain } = useOnboard();

  const chainId = computed(() => connectedChain.value?.id);
  const provider = computed(() => connectedWallet.value?.provider);

  const web3Provider = computed(() => {
    if (provider.value) {
      return new Web3Provider(provider.value);
    }
    return null;
  });

  const jsonRPCProvider = computed<JsonRpcProvider | null>(() => {
    if (chainId.value)
      return new JsonRpcProvider(rpcUrls[hexToNumber(chainId.value)]);
    return null;
  });

  return {
    web3Provider,
    jsonRPCProvider,
  };
}
