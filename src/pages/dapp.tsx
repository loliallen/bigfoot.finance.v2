import React, { useState } from "react";

import { Layout, Tabs } from "antd";
import { DappHeader } from "../containers/Header/DappHeader";
import { Main } from "../containers/Main";
import { Footer } from "../containers/Footer";

import { Dashboard } from "../components/Dashboard";
import { PurchaseNode } from "../components/PurchaseNode";
import { Nodes } from "../components/Nodes";
import { Staking } from "../components/Staking";
import { RewardsHistory } from "../components/Rewards";
import { SEO } from "../components/SEO";
import { AlertProvider } from "../hook/useAlert";
import { EthProvider } from "../hook/useEth";
import CONTRACTS from "../utils/CONRTACTS";
import { AppProvider } from "../hook/useEth/useApp";

type TabType =
  | "dashboard"
  | "purchase"
  | "nodes"
  | "nodes"
  | "staking"
  | "rewards";

const Dapp = () => {
  const [tab, setTab] = useState<TabType>("dashboard");
  return (
    <AlertProvider>
      <EthProvider contracts={CONTRACTS}>
        <AppProvider>
          <Layout>
            <SEO title="BigFoot Dapp" />
            <DappHeader />
            <Main style={{ padding: "2rem 10% 0" }}>
              <Tabs
                defaultActiveKey={tab}
                tabBarStyle={{ color: "gray" }}
                onChange={(k) => setTab(k as TabType)}
              >
                <Tabs.TabPane
                  tab="Dashboard"
                  key="dashboard"
                  children={<Dashboard />}
                />
                <Tabs.TabPane
                  tab="Purchase Node"
                  key="purchase"
                  children={<PurchaseNode />}
                />
                <Tabs.TabPane tab="Nodes" key="nodes" children={<Nodes />} />
                <Tabs.TabPane
                  tab="Staking"
                  key="staking"
                  children={<Staking />}
                />
                <Tabs.TabPane
                  tab="Rewards history"
                  key="rewards"
                  children={<RewardsHistory />}
                />
              </Tabs>
            </Main>
            <Footer />
          </Layout>
        </AppProvider>
      </EthProvider>
    </AlertProvider>
  );
};
export default Dapp;
