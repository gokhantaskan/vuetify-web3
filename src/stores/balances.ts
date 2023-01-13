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
  [key: string]: IBalance;
}

export const useBalancesStore = defineStore("balances", {
  state: (): IBalances => ({
    ETH: {
      raw: null,
      str: null,
    },
  }),
  actions: {
    async getEthBalance(provider: Web3Provider, address: string) {
      this.resetEthBalance();

      console.log("Fetching ETH balance...");

      try {
        this.ETH.raw = await provider.getBalance(address);
        this.ETH.str = formatEther(this.ETH.raw);
      } catch (e: any) {
        this.resetEthBalance();
        throw new Error("Error getting ETH balance: " + e);
      }

      console.log("ETH balance: ", this.ETH);
    },
    resetEthBalance() {
      this.ETH.raw = null;
      this.ETH.str = null;
    },
  },
});
