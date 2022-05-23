import React from "react";
import { Helmet } from "react-helmet";

export type SEOProps = {
  title: string;
};

export const SEO = ({ title }: SEOProps) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="description"
        content="Bigfoot Finance begins a node-based project that seeks to develop into a multi-chain NFT marketplace. By utilizing a multi-network platform, Bigfoot Finance will create a large-scale network across multiple blockchains where users will buy and sell NFTs. Rather than an airdrop to reward OpenSea users, Bigfoot Finance will offer nodes upon inception to benefit anyone who participates rather than just whales and users with high trading volumes on OpenSea. Bigfoot Finance will begin on the Ethereum network initially before expanding to additional blockchains."
      />

      <link rel="icon" href="/logo.svg" type="image/svg" />
    </Helmet>
  );
};
