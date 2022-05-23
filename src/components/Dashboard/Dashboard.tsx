import React, { FC } from "react";
import {
  Button,
  Skeleton,
  Typography,
  Space,
  Alert,
  Statistic,
  Row,
  Col,
} from "antd";
import { Link } from "@reach/router";
import { Card } from "../../containers/Card";
import { useApp } from "../../hook/useEth/useApp/useApp";
import { useEth } from "../../hook/useEth/useEth";
import BNToString from "../../utils/BNToString";
import * as styles from "./styles.module.scss";

type Props = {
  path?: string;
};

export const Dashboard: FC<Props> = () => {
  const { account, is_testnet, logout } = useEth();
  const loaded = Boolean(account);
  const {
    state: {
      balance: { stable, bgft, bgft_price },
      nodes: { owned },
      rewards: { pending, perDay, perNode },
    },
    methods: {
      balance: { getToken, addERC20Token },
    },
    permissions: { isPresale },
  } = useApp();
  return (
    <section>
      <div>
        <Typography.Title
          level={3}
          style={{
            color: "gray",
            textTransform: "uppercase",
            marginTop: "1.5rem",
          }}
        >
          Dashboard
        </Typography.Title>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button.Group className={styles.button_group}>
              <Button
                className={styles.button_left}
                shape="round"
                type="primary"
                onClick={() => addERC20Token("bgft")}
              >
                Add $BGFT to Metamask
              </Button>
              <Button
                className={styles.button_right}
                shape="round"
                type="primary"
                onClick={() => addERC20Token("usdc")}
              >
                Add $USDC to Metamask
              </Button>
            </Button.Group>
          </div>
          {loaded && (
            <Button shape="round" type="primary" ghost onClick={logout}>
              Logout
            </Button>
          )}
        </div>
        {is_testnet && (
          <div style={{ marginTop: "1rem" }}>
            <Button shape="round" type="primary" onClick={() => getToken()}>
              Get USDC
            </Button>
          </div>
        )}
        <div className={styles.container}>
          <div className={styles.left_side}>
            <Card title="My $BGFT Balance" className={styles.long_card}>
              {!loaded ? (
                <>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <Skeleton.Input />
                  </div>
                  <div>
                    <Skeleton.Input />
                  </div>
                </>
              ) : (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="$BGFT"
                        value={BNToString(String(bgft), 18)}
                        groupSeparator=" "
                        precision={3}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="$USDC"
                        value={stable}
                        groupSeparator=" "
                        precision={3}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Card>
            <Card className={styles.large_card} title="Unclaimed Rewards">
              <div>
                <Typography.Title
                  level={5}
                  type="secondary"
                  style={{ margin: ".5rem 0" }}
                >
                  {perNode} Per/Node
                </Typography.Title>
                <Typography.Title
                  level={5}
                  type="secondary"
                  style={{ margin: ".5rem 0" }}
                >
                  {perDay} Per/Day
                </Typography.Title>
              </div>
              <Space direction="vertical">
                <div>
                  <Typography.Title level={5} type="warning">
                    {pending.toFixed(3)} Reward pending
                  </Typography.Title>
                  <Link to="/dapp/nodes">
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Claim Now
                    </Button>
                  </Link>
                </div>

                {isPresale && (
                  <Alert
                    type="warning"
                    banner
                    message="We are in presale so rewards will start accumulating afterwards"
                  />
                )}
              </Space>
            </Card>
            <Card title="My Nodes">
              {!loaded ? (
                <Skeleton.Button />
              ) : (
                <Link to="/dapp/nodes">
                  <Typography.Title level={4} type="secondary">
                    {owned}
                  </Typography.Title>
                </Link>
              )}
            </Card>

            <Card>
              {!loaded ? (
                <Skeleton.Button />
              ) : bgft_price !== 0 ? (
                <Statistic
                  title="Current $BGFT Price"
                  value={bgft_price}
                  suffix="$"
                  precision={4}
                />
              ) : (
                <></>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
