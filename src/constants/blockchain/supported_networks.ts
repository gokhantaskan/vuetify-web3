import { ChainId } from "@/types/enums/chain_ids";
import { numberToHex } from "@/utils/format";

export interface ISupportedNetworks {
  [network: number]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
  };
}

export type SupportedNetwork =
  (typeof SUPPORTED_NETWORKS)[keyof typeof SUPPORTED_NETWORKS];

export const DEFAULT_NETWORK = ChainId.ETHEREUM;

export const SUPPORTED_NETWORKS: ISupportedNetworks = {
  [ChainId.ETHEREUM]: {
    chainId: `${numberToHex(ChainId.ETHEREUM)}`,
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  [ChainId.GOERLI]: {
    chainId: `${numberToHex(ChainId.GOERLI)}`,
    chainName: "Görli",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  [ChainId.FANTOM]: {
    chainId: `${numberToHex(ChainId.FANTOM)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [ChainId.BSC]: {
    chainId: `${numberToHex(ChainId.BSC)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [ChainId.POLYGON]: {
    chainId: `${numberToHex(ChainId.POLYGON)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  [ChainId.AVALANCHE]: {
    chainId: `${numberToHex(ChainId.AVALANCHE)}`,
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io"],
  },
  [ChainId.ARBITRUM]: {
    chainId: `${numberToHex(ChainId.ARBITRUM)}`,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  [ChainId.HARDHAT]: {
    chainId: `${numberToHex(ChainId.HARDHAT)}`,
    chainName: "Hardhat",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://localhost:8545"],
  },
};
