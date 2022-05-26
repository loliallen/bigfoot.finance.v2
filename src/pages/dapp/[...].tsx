import React, { useEffect, useState } from "react";

import { Layout, Tabs } from "antd";
import { Router, useLocation } from "@reach/router";
import { DappHeader } from "../../containers/Header/DappHeader";
import { Main } from "../../containers/Main";
import { Footer } from "../../containers/Footer";
import { Dashboard } from "../../components/Dashboard";
import { PurchaseNode } from "../../components/PurchaseNode";
import { Nodes } from "../../components/Nodes";
import { Staking } from "../../components/Staking";
import { RewardsHistory } from "../../components/Rewards";
import { SEO } from "../../components/SEO";
import { AlertProvider } from "../../hook/useAlert";
import { EthProvider } from "../../hook/useEth";
import CONTRACTS from "../../utils/CONRTACTS";
import { AppProvider } from "../../hook/useEth/useApp";
import { navigate } from "gatsby";

type TabType =
  | "dashboard"
  | "purchase"
  | "nodes"
  | "nodes"
  | "staking"
  | "rewards";

const Dapp = () => {
  const location = useLocation();
  const [tab, setTab] = useState<TabType>(
    (location.pathname.replace("dapp", "").replaceAll("/", "") as TabType) ||
      "dashboard"
  );

  useEffect(() => {
    navigate(`/dapp/${tab}`);
  }, [tab]);
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
                <Tabs.TabPane tab="Dashboard" key="dashboard" />
                <Tabs.TabPane tab="Purchase Node" key="purchase" />
                <Tabs.TabPane tab="Nodes" key="nodes" />
                <Tabs.TabPane tab="Staking" key="staking" />
                <Tabs.TabPane tab="Rewards history" key="rewards" />
              </Tabs>
              <Router basepath="/dapp">
                <Dashboard path="/dashboard" />
                <PurchaseNode path="/purchase" />
                <Nodes path="/nodes" />
                <Staking path="/staking" />
                <RewardsHistory path="/rewards" />
              </Router>
            </Main>
            <Footer />
          </Layout>
        </AppProvider>
      </EthProvider>
    </AlertProvider>
  );
};
export default Dapp;
