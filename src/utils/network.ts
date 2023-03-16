import { SUPPORTED_NETWORKS } from "@/constants/blockchain";

type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};

interface SwitchNetworkArguments {
  provider: ExternalProvider;
  chainId: number;
}

export const switchToNetwork = async ({
  provider,
  chainId,
}: SwitchNetworkArguments) => {
  if (!provider.request) return;

  const params = SUPPORTED_NETWORKS[chainId];

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: params.chainId }],
    });
  } catch (error) {
    console.error("Error switching network", error);

    // @ts-ignore TYPE NEEDS FIXING
    if (error.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: params.chainId }],
        });
      } catch (error) {
        console.error("Added network but could not switch chains", error);
      }
    } else {
      console.error("Switch chain error", error);
      throw error;
    }
  }
};
