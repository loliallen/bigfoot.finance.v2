import React from "react";
import { Layout } from "antd";
import { Footer } from "../containers/Footer";
import { Header } from "../containers/Header";
import { MarketplaceThumb } from "../containers/MarketplaceThumb/MarketplaceThumb";
import { SEO } from "../components/SEO";
import "../styles/global.scss";
import { ThemeProvider } from "../components/ThemeSwitcher/ThemeProvider";

const MarketplacePage = () => (
  <ThemeProvider ignoreStored>
    <Layout>
      <SEO title="BigFoot Marketplace" />
      <Header position="absolute" color="#B4B4B6" />
      <MarketplaceThumb />
      <Footer />
    </Layout>
  </ThemeProvider>
);
export default MarketplacePage;
