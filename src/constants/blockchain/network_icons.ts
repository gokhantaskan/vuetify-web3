import arbitrum from "@/assets/img/icons/chains/arbitrum.svg";
import avalanche from "@/assets/img/icons/chains/avax.svg";
import bsc from "@/assets/img/icons/chains/bsc.svg";
import ethereum from "@/assets/img/icons/chains/ethereum.svg";
import fantom from "@/assets/img/icons/chains/fantom.svg";
import goerli from "@/assets/img/icons/chains/goerli.svg";
import localhost from "@/assets/img/icons/chains/localhost.svg";
import polygon from "@/assets/img/icons/chains/polygon.svg";
import { ChainId } from "@/types/enums/chain_ids";

export const NETWORK_ICON: Record<number, string> = {
  [ChainId.ETHEREUM]: ethereum,
  [ChainId.GOERLI]: goerli,
  [ChainId.FANTOM]: fantom,
  [ChainId.BSC]: bsc,
  [ChainId.POLYGON]: polygon,
  [ChainId.AVALANCHE]: avalanche,
  [ChainId.ARBITRUM]: arbitrum,
  [ChainId.HARDHAT]: localhost,
};
