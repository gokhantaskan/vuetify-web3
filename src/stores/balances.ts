import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { defineStore } from "pinia";

export type BalanceRaw = BigNumber | null;
export type BalanceStr = string | null;
export interface IBalance {
  raw: BalanceRaw;
  str: BalanceStr;
}
export interface IBalances {
  [key: string]: IBalance & Partial<{ loading: boolean; error: string | null }>;
}

export const useBalancesStore = defineStore("balances", {
  state: (): IBalances => ({
    eth: {
      raw: null,
      str: null,
      error: null,
      loading: false,
    },
  }),
  actions: {
    async getEthBalance(provider: Web3Provider, address: string) {
      if (!provider || !address) {
        return;
      }

      try {
        this.eth.loading = true;
        this.eth.raw = await provider.getBalance(address);
        this.eth.str = formatEther(this.eth.raw);

        console.log("ETH balance: ", this.eth);
      } catch (e: any) {
        throw new Error("Error getting ETH balance: " + e);
      } finally {
        this.eth.loading = false;
      }
    },
    resetEthBalance() {
      this.eth.raw = null;
      this.eth.str = null;
      this.eth.error = null;
    },
  },
});
