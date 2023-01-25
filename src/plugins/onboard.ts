import injectedModule from "@web3-onboard/injected-wallets";
import ledgerModule from "@web3-onboard/ledger";
import { init } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";

import { SUPPORTED_NETWORKS } from "@/constants/blockchain/supported_networks";
import { ChainId } from "@/types/enums/chain_ids";

const injected = injectedModule();
const walletConnect = walletConnectModule();
const ledger = ledgerModule();

/**
 * Remove test networks from the network dialog
 */
const supportedNetworks = { ...SUPPORTED_NETWORKS };
[ChainId.GOERLI, ChainId.HARDHAT].forEach(id => delete supportedNetworks[id]);

init({
  wallets: [injected, walletConnect, ledger],
  chains: Object.values(supportedNetworks).map(network => ({
    id: network.chainId,
    label: network.chainName,
    token: network.nativeCurrency.symbol,
    rpcUrl: network.rpcUrls[0],
    blockExplorerUrl: network.blockExplorerUrls?.[0],
  })),
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
