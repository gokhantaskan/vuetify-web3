import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";

import { SUPPORTED_NETWORKS } from "@/constants/blockchain/supported_networks";

/**
 * Remove test networks
 */
const supportedNetworks = { ...SUPPORTED_NETWORKS };
delete supportedNetworks[5];

const supportedChains = Object.values(supportedNetworks).map(network => ({
  id: network.chainId,
  label: network.chainName,
  token: network.nativeCurrency.symbol,
  rpcUrl: network.rpcUrls[0],
  blockExplorerUrl: network.blockExplorerUrls[0],
}));

console.log(supportedChains);

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

export { supportedNetworks };
