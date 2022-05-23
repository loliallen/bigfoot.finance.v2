import * as React from "react";
import { Layout } from "antd";
import { Main } from "../containers/Main";
import { Footer } from "../containers/Footer";
import { Banner } from "../containers/Banner";
import { Content } from "../containers/Content";
import { Header } from "../containers/Header";
import { SEO } from "../components/SEO";
import ContentData from "../content/content.json";
import "../styles/pages/home.scss";

const IndexPage = () => {
  return (
    <Layout className="main_layout">
      <SEO title="BigFoot Finance" />
      <Main>
        <Header position="absolute" color="#B4B4B6" />
        <Banner />
        <Content data={ContentData} />
      </Main>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
