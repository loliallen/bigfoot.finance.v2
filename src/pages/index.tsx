import * as React from "react";
import { Layout } from "antd";
import Aos from "aos";
import { Main } from "../containers/Main";
import { Footer } from "../containers/Footer";
import { Banner } from "../containers/Banner";
import { Content } from "../containers/Content";
import { Header } from "../containers/Header";
import { SEO } from "../components/SEO";
import ContentData from "../content/content.json";
import { ThemeProvider } from "../components/ThemeSwitcher/ThemeProvider";
import { TrueBanner } from "../containers/TrueStory/TrueBanner";

const IndexPage = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined") Aos.init();
  }, []);
  return (
    <ThemeProvider ignoreStored>
      <Layout className="main_layout">
        <SEO title="BigFoot Finance" />
        <TrueBanner />
        <Main>
          <Header position="absolute" color="#B4B4B6" />
          <Banner />
          <Content data={ContentData} />
        </Main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
