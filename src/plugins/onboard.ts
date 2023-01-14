import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/vue";
import walletConnectModule from "@web3-onboard/walletconnect";

const injected = injectedModule();
const walletConnect = walletConnectModule();

init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: 1,
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://eth-rpc.gateway.pokt.network",
      blockExplorerUrl: "https://etherscan.io",
    },
    {
      id: 137,
      token: "MATIC",
      label: "Polygon Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
      blockExplorerUrl: "https://polygonscan.com",
    },
  ],
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
