import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { IProviderOptions } from "web3modal";
import config from "../../utils/config";

export const IS_TESTNET = config.IS_TESTNET;

export const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: (() => {
      const data: {
        rpc?: Record<number, string>;
        chainId?: number;
        infuraId?: string;
      } = {};
      if (IS_TESTNET) {
        data["rpc"] = {};
        data["rpc"][43113] = "https://api.avax-test.network/ext/bc/C/rpc";
        data["chainId"] = 43113;
      } else {
        data["infuraId"] = "0e0cb6286a52412084c38ae8800bb42b";
      }
      return data;
    })(),
  },
};
