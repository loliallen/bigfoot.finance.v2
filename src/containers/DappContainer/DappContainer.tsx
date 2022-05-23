import { Layout, Tabs } from "antd";
import { navigate } from "gatsby";
import React, { ReactNode } from "react";
import { Footer } from "../Footer";
import { DappHeader } from "../Header/DappHeader";
import { Main } from "../Main";

export type DappContainerProps = {
  children?: ReactNode;
};
export const DappContainer = ({ children }: DappContainerProps) => {
  return (
    <Layout>
      <DappHeader />
      <Main style={{ padding: "2rem 10% 0" }}>
        <Tabs
          defaultActiveKey={location.pathname
            .replace("dapp", "")
            .replace(/\//g, "")}
          tabBarStyle={{ color: "gray" }}
          onChange={(k) => navigate(`/dapp/${k}`)}
        >
          <Tabs.TabPane tab="Dashboard" key="dashboard" />
          <Tabs.TabPane tab="Purchase Node" key="purchase" />
          <Tabs.TabPane tab="Nodes" key="nodes" />
          <Tabs.TabPane tab="Staking" key="staking" />
          <Tabs.TabPane tab="Rewards history" key="rewards" />
        </Tabs>
        {children}
      </Main>
      <Footer />
    </Layout>
  );
};
