import type { Contract } from "@ethersproject/contracts";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useAppStore } from "@/stores/app";
import { getContract } from "@/utils/contract";

import { useWeb3Provider } from "./useWeb3Provider";

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { address: account, chainId } = storeToRefs(useAppStore());
  const { web3Provider: library } = useWeb3Provider();

  return computed(() => {
    if (!addressOrAddressMap || !ABI || !library.value || !chainId.value)
      return null;

    let address: string | undefined;

    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId.value];

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
