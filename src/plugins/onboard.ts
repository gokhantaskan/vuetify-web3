import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";

import { SUPPORTED_NETWORKS } from "@/constants/blockchain/supported_networks";

const networks = SUPPORTED_NETWORKS;
delete networks[5];

const supportedChains = Object.keys(networks).map(network => ({
  id: SUPPORTED_NETWORKS[network as unknown as number].chainId,
  label: SUPPORTED_NETWORKS[network as unknown as number].chainName,
  token: SUPPORTED_NETWORKS[network as unknown as number].nativeCurrency.symbol,
  rpcUrl: SUPPORTED_NETWORKS[network as unknown as number].rpcUrls[0],
  blockExplorerUrl:
    SUPPORTED_NETWORKS[network as unknown as number].blockExplorerUrls[0],
}));

const injected = injectedModule();
const walletConnect = walletConnectModule();

init({
  wallets: [injected, walletConnect],
  chains: supportedChains,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  appMetadata: {
    name: "Application",
    description: "Vite + Vuetify + Tailwind + Web3 Onboard Application",
    icon: "<svg></svg>",
  },
});
