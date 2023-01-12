import type { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { defineStore } from "pinia";

export interface IBalancesStore {
  eth: string | null;
}

export const useBalancesStore = defineStore("balances", {
  state: (): IBalancesStore => ({
    eth: null,
  }),
  actions: {
    async getEthBalance(provider: Web3Provider, address: string) {
      console.log("Fetching ETH balance...");
      this.eth = null;

      try {
        const rawBalance = await provider.getBalance(address);
        const balance = formatEther(rawBalance);
        this.eth = balance;
      } catch (e: any) {
        this.eth = "0";
        throw new Error("Error getting ETH balance: " + e);
      }
    },
  },
});
