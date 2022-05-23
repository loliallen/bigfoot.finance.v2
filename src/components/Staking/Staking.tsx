import React from "react";
import {
  Alert,
  Button,
  Col,
  Input,
  Row,
  Statistic,
  Tooltip,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { Card } from "../../containers/Card";
import { useApp } from "../../hook/useEth/useApp/useApp";
import BNToString from "../../utils/BNToString";
import StringToBN from "../../utils/StringToNB";
import * as styles from "./styles.module.scss";

type Props = {
  path?: string;
};

export const Staking: FC<Props> = () => {
  const {
    state: {
      staking,
      balance: { bgft, bgft_price },
    },
    methods: {
      staking: { stake, unstake, approve },
    },
    permissions: { isStakeApproved, isUnstakeApproved, isPresale },
  } = useApp();
  const [toStake, setToStake] = useState("");
  const [toUnstake, setToUnstake] = useState("");
  const [toStakeStr, setToStakeStr] = useState("");
  const [toUnstakeStr, setToUnstakeStr] = useState("");

  useEffect(() => {
    setToStake(StringToBN(toStakeStr, 18));
    // console.log(StringToBN(toStakeStr, 18));
  }, [toStakeStr]);

  useEffect(() => {
    setToUnstake(StringToBN(toUnstakeStr, 18));
    // console.log(StringToBN(toUnstakeStr, 18));
  }, [toUnstakeStr]);

  return (
    <>
      {isPresale && (
        <Alert
          message="The staking is disabled until the presale is complete"
          type="warning"
          banner
        />
      )}
      <Typography.Title
        level={3}
        style={{
          color: "gray",
          textTransform: "uppercase",
          marginTop: "1.5rem",
        }}
      >
        Staking
      </Typography.Title>

      <div className={styles.container}>
        <Card style={{ gridColumn: "span 2 / auto" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="TVL"
                value={(staking.total / 1e18) * bgft_price}
                precision={3}
                groupSeparator=" "
                suffix="$"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="APY"
                value={staking.apy}
                groupSeparator=" "
                precision={3}
                suffix="%"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total staked"
                value={staking.total / 1e18}
                groupSeparator=" "
                precision={3}
                suffix="$BGFT"
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Statistic.Countdown
            title="Rebase In"
            value={staking.rebase_in.getTime()}
          />
        </Card>
        <Card>
          <Statistic
            title="Staked"
            value={staking.staked / 1e18}
            precision={3}
            groupSeparator=" "
            suffix={`$BGFT`}
          />
          <Tooltip
            title="ROI is calculated from the last unstake"
            placement="bottom"
          >
            <Statistic title="ROI" value={staking.pnl.percents} />
          </Tooltip>
        </Card>
        <Card>
          <Statistic
            title="$BGFT"
            value={bgft / 1e18}
            groupSeparator=" "
            precision={3}
          />
        </Card>
        <Card title="Stake">
          {isStakeApproved ? (
            <>
              <Input
                placeholder={`max: ${BNToString(bgft.toString(), 18)}`}
                value={toStakeStr}
                onChange={(e) => {
                  setToStakeStr(e.target.value);
                }}
                addonAfter={
                  <Button
                    type="text"
                    onClick={() => {
                      // console.log(bgft);
                      setToStakeStr(BNToString(bgft.toString(), 18));
                    }}
                  >
                    All
                  </Button>
                }
              />

              <Button
                style={{ width: "100%", marginTop: "1rem" }}
                type="primary"
                shape="round"
                onClick={() => {
                  stake(toStake);
                  setToStakeStr("");
                }}
              >
                Stake
              </Button>
            </>
          ) : (
            <Button
              style={{ width: "100%", marginTop: "1rem" }}
              type="primary"
              shape="round"
              onClick={approve.staking}
            >
              Approve staking
            </Button>
          )}
        </Card>
        <Card title="Unstake">
          {isUnstakeApproved ? (
            <>
              <Input
                placeholder={`max: ${BNToString(
                  staking.staked.toString(),
                  18
                )}`}
                max={BNToString(staking.staked.toString(), 18)}
                min={0}
                value={toUnstakeStr}
                onChange={(e) => setToUnstakeStr(e.target.value)}
                addonAfter={
                  <Button
                    type="text"
                    onClick={() =>
                      setToUnstakeStr(BNToString(staking.staked.toString(), 18))
                    }
                  >
                    All
                  </Button>
                }
              />

              <Button
                style={{ width: "100%", marginTop: "1rem" }}
                type="primary"
                shape="round"
                onClick={() => {
                  unstake(toUnstake);
                  setToUnstakeStr("0");
                }}
              >
                Unstake
              </Button>
            </>
          ) : (
            <Button
              style={{ width: "100%", marginTop: "1rem" }}
              type="primary"
              shape="round"
              onClick={approve.unstaking}
            >
              Approve unstaking
            </Button>
          )}
        </Card>
      </div>
    </>
  );
};
