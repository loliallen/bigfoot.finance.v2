import React from "react";
import { Button } from "antd";
import { navigate } from "gatsby";
import { CSSProperties } from "react";
import { _Header } from "./_Header";
import { createLinkItem } from "./helpers";

type Props = {
  position?: CSSProperties["position"];
  color?: "white" | "black" | string;
};

export const Header = ({ position = "relative", color = "black" }: Props) => {
  return (
    <_Header
      showLogo
      links={[
        createLinkItem("Home", "/"),
        createLinkItem("Marketplace", "/marketplace"),
        createLinkItem(
          "Buy $BGFT",
          "https://app.sushi.com/swap?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0xc4EA977c6c3519a8527f3Ff0728cAaB40c107152",
          true
        ),
      ]}
      button={
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={() => navigate("/dapp")}
        >
          Open App
        </Button>
      }
      typographyProps={{ color }}
      layoutProps={{ position }}
    />
  );
};
