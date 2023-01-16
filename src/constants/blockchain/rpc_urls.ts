import { ChainId } from "@/types/enums/chain_ids";

export const RPC_URLS: { [chainId: number]: string } = {
  [ChainId.ETHEREUM]: `https://eth-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_KEY_MAINNET
  }`,
  [ChainId.GOERLI]: `https://eth-goerli.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_KEY_GOERLI
  }`,
  [ChainId.POLYGON]: `https://polygon-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_KEY_POLYGON
  }`,
  [ChainId.ARBITRUM]: `https://arb-mainnet.g.alchemy.com/v2/${
    import.meta.env.VITE_ALCHEMY_KEY_ARBITRUM
  }`,
};
