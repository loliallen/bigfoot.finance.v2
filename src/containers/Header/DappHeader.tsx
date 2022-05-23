import React from "react";
import { Button } from "antd";
import { useEth } from "../../hook/useEth/useEth";
import { createLinkItem } from "./helpers";
import { _Header } from "./_Header";

export const DappHeader = () => {
  const { connectWallet, account } = useEth();

  const handleConnect = () => {
    !account && connectWallet();
  };
  return (
    <_Header
      showLogo
      links={[
        createLinkItem("Home", "/"),
        createLinkItem("Marketplace", "/marketplace/"),
        createLinkItem(
          "Buy $BGFT",
          "https://app.sushi.com/swap?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0xc4EA977c6c3519a8527f3Ff0728cAaB40c107152",
          true
        ),
      ]}
      typographyProps={{ color: "#B4B4B6" }}
      button={
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={handleConnect}
        >
          {account
            ? `${account.substring(0, 6)}...${account.substring(
                account.length - 4,
                account.length
              )}`
            : "Connect Wallet"}
        </Button>
      }
    />
  );
};