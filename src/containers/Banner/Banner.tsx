import React from "react";
import * as styles from "./styles.module.scss";
import { Button, Typography } from "antd";
import { Link } from "@reach/router";
import { Particles } from "../../components/Particles/Particles";
import { useLoader } from "../../components/Loader/Loader";
import box from "../../images/box.webp";

export const Banner = () => {
  return (
    <>
      <img className={styles.img} src={"/mainpage_back.jpg"} />
      <div className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.labels}>
            <Typography.Title className={styles.title}>
              BigFoot
            </Typography.Title>
            <Typography.Title className={styles.subtitle}>
              Finance
            </Typography.Title>
            <div style={{ marginTop: "3rem" }}>
              <Link to="/dapp">
                <Button size="large" shape="round" className={styles.button}>
                  buy node
                </Button>
              </Link>
            </div>
            <div className={styles.scroll_text}>
              <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
                Scroll down to learn more about node based project - BigFoot
                Finance
                <Particles hide />
              </Typography.Text>
            </div>
          </div>
          <div>
            <img src={box} alt="box animated" />
          </div>
        </div>
      </div>
    </>
  );
};
