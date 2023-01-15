import { ChainId } from "@/types/enums/chain_ids";

export const SUPPORTED_NETWORKS: Record<
  number,
  {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  }
> = {
  [ChainId.ETHEREUM]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [ChainId.GOERLI]: {
    chainId: "0x5",
    chainName: "Görli",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3"],
    blockExplorerUrls: ["https://goerli.etherscan.com"],
  },
  [ChainId.FANTOM]: {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [ChainId.BSC]: {
    chainId: "0x38",
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
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  [ChainId.AVALANCHE]: {
    chainId: "0xa86a",
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
    chainId: "0xa4b1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
};
