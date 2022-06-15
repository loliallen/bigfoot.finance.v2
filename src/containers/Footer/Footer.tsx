import React from "react";
import { Button, Layout, Typography } from "antd";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import * as styles from "./styles.module.scss";
import { Link } from "@reach/router";
import { useThemeSwitcher } from "react-css-theme-switcher";

export const Footer = () => {
  const { currentTheme } = useThemeSwitcher();
  const email = "BigFootFinanceCrypto@gmail.com";
  return (
    <Layout.Footer
      className={styles.footer}
      style={{
        backgroundColor:
          currentTheme === "light"
            ? "hsla(0, 0%, 35%, 1)"
            : "hsla(0, 0%, 10%, 1)",
      }}
    >
      <div>
        <Button
          shape="round"
          type="primary"
          href={`mailto:${email}`}
          size="large"
        >
          Contact Us
        </Button>
      </div>
      <div />
      <div>
        <h4 className={styles.heading}>Company</h4>
        <a href="/whitepaper.pdf">
          <Typography.Title
            level={5}
            style={{
              color: "white",
              margin: 0,
              fontWeight: 200,
              fontSize: "17px",
            }}
          >
            BigFootPaper
          </Typography.Title>
        </a>
        <Link to="/marketplace">
          <Typography.Title
            level={5}
            style={{
              color: "white",
              margin: 0,
              fontWeight: 200,
              fontSize: "17px",
            }}
          >
            Marketplace
          </Typography.Title>
        </Link>
        <Link to="/dapp">
          <Typography.Title
            level={5}
            style={{
              color: "white",
              margin: 0,
              fontWeight: 200,
              fontSize: "17px",
            }}
          >
            Dapp
          </Typography.Title>
        </Link>
      </div>
      <div style={{ height: "min-content" }}>
        <h4 className={styles.heading}>Social</h4>
        <div className={styles.links}>
          <a href="https://discord.gg/bigfoot" target="_blank">
            <FaDiscord size={25} color="#d3e6f3" />
          </a>
          <a href="https://twitter.com/BigFootFinance_" target="_blank">
            <FaTwitter size={25} color="#d3e6f3" />
          </a>
        </div>
      </div>
    </Layout.Footer>
  );
};
