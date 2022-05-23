import React, { FC } from "react";
import { Button, Radio, Typography, Skeleton } from "antd";
import { Card } from "../../containers/Card";
import { useState } from "react";
import * as styles from "./styles.module.scss";
import { useApp } from "../../hook/useEth/useApp/useApp";
import { useEth } from "../../hook/useEth";

type Props = {
  path?: string;
};

export const PurchaseNode: FC<Props> = () => {
  const { account } = useEth();
  const {
    state: {
      nodes: { left, sold, total },
      balance: { stable },
    },
    methods: {
      nodes: { purchaseNodes, approve },
    },
    permissions: { isMintOpened, isPresale, isWhiteListed, isStableApproved },
  } = useApp();
  const [count, setCount] = useState(1);
  const incr = () => setCount((p) => p + 1);
  const decr = () => setCount((p) => (p > 1 ? p - 1 : 1));
  const loaded = Boolean(account);

  const buttonDisabled = () => {
    if (isMintOpened)
      if (!isPresale) return false;
      else if (isPresale && isWhiteListed) return false;
      else return true;
    else return true;
  };
  return (
    <section>
      <Typography.Title
        level={3}
        style={{
          color: "gray",
          marginTop: "1.5rem",
          textTransform: "uppercase",
        }}
      >
        Purchase Node
      </Typography.Title>
      <div className={styles.container}>
        <Card title="Total Nodes Sold">
          {!loaded ? (
            <Skeleton.Button />
          ) : (
            <Typography.Title level={4} type="secondary">
              {sold}
            </Typography.Title>
          )}
        </Card>
        <Card title="Total Supply">
          <Typography.Title level={4} type="secondary">
            {left.total}
          </Typography.Title>
        </Card>

        <Card title="Current USDC Balance">
          {!loaded ? (
            <Skeleton.Button />
          ) : (
            <Typography.Title level={4} type="secondary">
              {stable}
            </Typography.Title>
          )}
        </Card>
        <Card title="Buy $BGFT">
          <Typography.Title level={4} type="secondary">
            <Button
              type="link"
              href="https://app.sushi.com/swap?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0xc4EA977c6c3519a8527f3Ff0728cAaB40c107152"
            >
              Buy
            </Button>
          </Typography.Title>
        </Card>
        <Card
          title={
            <>
              <Typography.Text style={{ color: "gray" }}>
                Current price: {left.price} USDC
              </Typography.Text>
              <br />
              <Typography.Text style={{ color: "gray" }}>
                Total left at current price: {left.count}
              </Typography.Text>
            </>
          }
        >
          <div className={styles.buy_nodes}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Radio.Group size="large">
                <Radio.Button
                  style={{
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}
                  onClick={decr}
                >
                  -
                </Radio.Button>
                <Radio.Button>{count}</Radio.Button>
                <Radio.Button
                  style={{
                    borderTopRightRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}
                  onClick={incr}
                >
                  +
                </Radio.Button>
              </Radio.Group>
              <Button
                shape="round"
                size="large"
                type="primary"
                style={{ marginTop: "0.5rem" }}
                onClick={() =>
                  !isStableApproved ? approve() : purchaseNodes(count)
                }
                disabled={buttonDisabled()}
              >
                {!isStableApproved ? "Approve" : "Create"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
