import type { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useOnboard } from "@web3-onboard/vue";
import { computed } from "vue";

import { getContract } from "@/utils/contract";
import { hexToNumber } from "@/utils/format";

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { connectedChain, connectedWallet } = useOnboard();

  const chainId = computed(() => connectedChain.value?.id);
  const account = computed(() => connectedWallet.value?.accounts[0].address);
  const provider = computed(() => connectedWallet.value?.provider);
  const library = computed(() => {
    if (provider.value) {
      return new Web3Provider(provider.value);
    }
    return null;
  });

  return computed(() => {
    if (!addressOrAddressMap || !ABI || !library.value || !chainId.value)
      return null;

    let address: string | undefined;

    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[hexToNumber(chainId.value)];

    if (!address) return null;

    try {
      return getContract(
        address,
        ABI,
        library.value,
        withSignerIfPossible && account.value ? account.value : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }).value as T;
}
