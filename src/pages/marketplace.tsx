import React from "react";
import { Layout } from "antd";
import { Footer } from "../containers/Footer";
import { Header } from "../containers/Header";
import { MarketplaceThumb } from "../containers/MarketplaceThumb/MarketplaceThumb";
import { SEO } from "../components/SEO";

const MarketplacePage = () => (
  <Layout>
    <SEO title="BigFoot Marketplace" />
    <Header position="absolute" color="#B4B4B6" />
    <MarketplaceThumb />
    <Footer />
  </Layout>
);
export default MarketplacePage;
