import ethereum from "@/assets/img/icons/chains/1.svg";
import goerli from "@/assets/img/icons/chains/5.svg";
import bsc from "@/assets/img/icons/chains/56.svg";
import polygon from "@/assets/img/icons/chains/137.svg";
import fantom from "@/assets/img/icons/chains/250.svg";
import arbitrum from "@/assets/img/icons/chains/42161.svg";
import avalanche from "@/assets/img/icons/chains/43114.svg";
import { ChainId } from "@/types/enums/chain_ids";

export const NETWORK_ICON: Record<number, string> = {
  [ChainId.ETHEREUM]: ethereum,
  [ChainId.GOERLI]: goerli,
  [ChainId.FANTOM]: fantom,
  [ChainId.BSC]: bsc,
  [ChainId.POLYGON]: polygon,
  [ChainId.AVALANCHE]: avalanche,
  [ChainId.ARBITRUM]: arbitrum,
};
