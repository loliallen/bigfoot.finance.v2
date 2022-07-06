import { Button, Typography } from "antd";
import { Link } from "gatsby";
import React from "react";
import * as styles from "./style.module.scss";
export const TrueBanner = () => {
  return (
    <>
      <div className={styles.banner_header}>
        <Typography.Title
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            marginTop: "2rem",
            fontWeight: "900",
            fontSize: "4.5rem",
            lineHeight: "1.5",
            borderBottom: "8px solid #9bc7e4",
          }}
        >
          <span style={{ color: "#9bc7e4" }}>BIGFOOT: </span>
          <span style={{ color: "#b4b4b6" }}>The Real Story</span>
        </Typography.Title>
      </div>
      <div className={styles.banner}>
        <div>
          <Typography.Title
            level={4}
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            ATTENTION!!! Neal (ShibLord) stole the Treasury and is trying to
            take over the BigFoot project
          </Typography.Title>
        </div>
        <div>
          <Link to="/true">
            <Button
              size="large"
              shape="round"
              type="primary"
              style={{
                fontSize: "2.5rem",
                height: "100%",
                borderRadius: "50px",
                padding: "0.5rem 4rem",
              }}
            >
              READ MORE
            </Button>
          </Link>
          <Typography.Text type="secondary" style={{ marginTop: "0.25rem" }}>
            …the TRUTH about ShibLord’s announcement
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
