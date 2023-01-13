import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { defineStore } from "pinia";

import { bigNumberToTrimmed } from "@/utils/format";

export interface IBalancesStore {
  str: {
    [symbol: string]: string | null;
  };
  raw: {
    [symbol: string]: BigNumber | null;
  };
}

export const useBalancesStore = defineStore("balances", {
  state: (): IBalancesStore => ({
    str: {
      eth: null,
    },
    raw: {
      eth: null,
    },
  }),
  actions: {
    async getEthBalance(provider: Web3Provider, address: string) {
      this.resetEthBalance();

      console.log("Fetching ETH balance...");

      try {
        this.raw.eth = await provider.getBalance(address);
        this.str.eth = formatEther(this.raw.eth);
      } catch (e: any) {
        this.resetEthBalance();
        throw new Error("Error getting ETH balance: " + e);
      }

      console.log("ETH balance: ", bigNumberToTrimmed(this.raw.eth));
    },
    resetEthBalance() {
      this.raw.eth = null;
      this.str.eth = null;
    },
  },
});
