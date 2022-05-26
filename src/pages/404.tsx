import React from "react";
import { Layout, Typography } from "antd";
import { Footer } from "../containers/Footer";
import { Header } from "../containers/Header";
import { Main } from "../containers/Main";

const NotFoundPage = () => (
  <Layout>
    <Header />
    <Main>
      <Typography.Title
        style={{ textAlign: "center", marginTop: "30vh", color: "gray" }}
      >
        Page Not Found
      </Typography.Title>
    </Main>
    <Footer />
  </Layout>
);

export default NotFoundPage;
