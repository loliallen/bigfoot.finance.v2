import React from "react";
import { Layout } from "antd";
import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};
export const Main = ({ children, style }: Props) => {
  return (
    <Layout className="layout">
      <Layout.Content className="main" style={style}>
        {children}
      </Layout.Content>
    </Layout>
  );
};
