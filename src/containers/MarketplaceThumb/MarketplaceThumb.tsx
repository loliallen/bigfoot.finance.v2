import React from "react";
import { Button, Typography, Card as AntCard } from "antd";
import { useLoader } from "../../components/Loader/Loader";
import { Card } from "../Card";
import * as styles from "./styles.module.scss";
export const MarketplaceThumb = () => {
  return (
    <>
      <img src="/marketpaclepage_back.jpg" className={styles.img} />
      <div className={styles.container}>
        <div className={styles.labels}>
          <Typography.Title className={styles.title}>BigFoot</Typography.Title>
          <Typography.Title className={styles.subtitle}>
            Finance
          </Typography.Title>
          <div className={styles.scroll_text}>
            <Typography.Title
              level={4}
              type="secondary"
              style={{ fontWeight: 300 }}
            >
              The Node Based NFT Marketplace
            </Typography.Title>
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Button size="large" shape="round" className={styles.button}>
              coming soon
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: 500,
            }}
            cover={
              <video
                src="/box.mp4"
                style={{
                  borderRadius: "15px 15px 0 0",
                  width: "100%",
                  height: "100%",
                }}
                autoPlay
                muted
                loop
              />
            }
          >
            <AntCard.Meta
              description={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>BigFoot Node</div> <div>$BGFT</div>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </>
  );
};
