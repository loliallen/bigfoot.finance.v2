import React from "react";
import { Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { Reward } from "../../hook/useEth/useApp/interfaces";
import { useApp } from "../../hook/useEth/useApp/useApp";
import BNToString from "../../utils/BNToString";

const columns: ColumnsType<Reward> = [
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (r: string) => <>{BNToString(r, 18)}</>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (r: string) => (
      <>
        {new Date(r).toLocaleDateString()} {new Date(r).toLocaleTimeString()}
      </>
    ),
  },
];

type Props = {
  path?: string;
};

export const RewardsHistory: FC<Props> = () => {
  const {
    state: {
      rewardsData: { data: rewards },
    },
  } = useApp();

  return (
    <>
      <Typography.Title
        level={3}
        style={{
          color: "gray",
          textTransform: "uppercase",
          marginTop: "1.5rem",
        }}
      >
        Rewards History
      </Typography.Title>
      <Table columns={columns} dataSource={rewards} />
    </>
  );
};
