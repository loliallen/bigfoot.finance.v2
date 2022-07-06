import React from "react";
import { Button, Typography } from "antd";
import * as styles from "./style.module.scss";
import data from "./data.json";
import { Link } from "gatsby";

export const TrueStory = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title
          style={{
            marginBottom: "2rem",
            marginTop: "5%",
            fontWeight: "900",
            fontSize: "6.5rem",
            lineHeight: "1.5",
            borderBottom: "8px solid #9bc7e4",
          }}
        >
          <span style={{ color: "#9bc7e4" }}>BIGFOOT: </span>
          <span style={{ color: "#b4b4b6" }}>The Real Story</span>
        </Typography.Title>
        <Typography.Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          ATTENTION!!! ShibLord (Neal Bakker) is trying to take over the BigFoot
          <br />
          project all for himself and kick out GreenYeti and Frey against their
          will!
        </Typography.Title>
      </div>
      <div className={styles.content}>
        {data.map((s) => (
          <Typography.Paragraph style={{ fontSize: "24px" }}>
            <div dangerouslySetInnerHTML={{ __html: s }} />
          </Typography.Paragraph>
        ))}
      </div>
      <div className={styles.button_container}>
        <a href="https://discord.gg/7wNPpqz7Kj">
          <Button
            size="large"
            shape="round"
            type="primary"
            style={{
              fontSize: "2.5rem",
              height: "100%",
              borderRadius: "70px",
              padding: "0.5rem 4rem",
            }}
          >
            JOIN DISCORD
          </Button>
        </a>
        <Typography.Text type="secondary" style={{ marginTop: "0.25rem" }}>
          ... to learn more and ask your questions
        </Typography.Text>
      </div>
    </div>
  );
};
