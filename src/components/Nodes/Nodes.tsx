import React from "react";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Modal,
  Radio,
  Row,
  Statistic,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, Key, useEffect, useMemo, useState } from "react";
import { IToken } from "../../hook/useEth/useApp/interfaces";
import { useApp } from "../../hook/useEth/useApp/useApp";

type Props = {
  path?: string;
};

export const Nodes: FC<Props> = () => {
  const {
    permissions: { isPresale },
    additional: { tokens },
    methods: {
      nodes: { claimNodes },
    },
  } = useApp();

  const [selectedNodes, setSelectedNodes] = useState<IToken[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const [nodesToClaim, setNodesToClaim] = useState<string | string[]>();

  const [open, setOpen] = useState(false);
  const [stakeRewards, setStakeRewards] = useState<"yes" | "no" | "none">(
    "none"
  );

  const handleSubmit = () => {
    setOpen(false);
    if (nodesToClaim) claimNodes(nodesToClaim, stakeRewards === "yes");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns: ColumnsType<IToken> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Pending reward",
      dataIndex: "reward",
      key: "reward",
      defaultSortOrder: "descend",
      sorter: (a: IToken, b: IToken) => Number(a.reward) - Number(b.reward),
      render: (r: string) => <>{r}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IToken) => (
        <>
          <Button
            shape="round"
            type="primary"
            onClick={() => setNodesToClaim(record.id)}
            disabled={isPresale}
          >
            Claim
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (nodesToClaim) setOpen(true);
  }, [nodesToClaim]);

  useEffect(() => {
    if (!open) setStakeRewards("none");
  }, [open]);
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
        Nodes
      </Typography.Title>
      <Row gutter={16} style={{ marginBottom: "2rem" }}>
        <Col span={6}>
          <Statistic title="Quantity" value={tokens.length} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Total reward pending"
            precision={3}
            groupSeparator=" "
            value={tokens.reduce((r, i) => r + Number(i.reward), 0)}
          />
        </Col>
      </Row>
      {selectedNodes.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={4}>
            Nodes selected: {selectedNodes.length}
          </Typography.Title>
          <Button
            type="primary"
            shape="round"
            onClick={() => setNodesToClaim(selectedNodes.map((n) => n.id))}
          >
            Claim selected
          </Button>
        </div>
      )}
      {isPresale && (
        <Alert
          type="warning"
          banner
          message="We are in presale so rewards will start accumulating afterwards"
        />
      )}
      <Alert
        type="info"
        banner
        message="To activate your rewards from your node, please ensure to do a one time activation on any purchased nodes to generate rewards by clicking 'claim'"
      />
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (selectedKeys, selectedRows) => {
            setSelectedNodes(selectedRows);
            setSelectedKeys(selectedKeys);
          },
          selectedRowKeys: selectedKeys,
        }}
        rowKey={(record: IToken) => record.id}
        columns={columns}
        dataSource={tokens.map((t) => ({ ...t, key: t.id }))}
      />

      <Modal
        title={
          Array.isArray(nodesToClaim)
            ? `Claim ${nodesToClaim.length} nodes`
            : `Claim #${nodesToClaim} node`
        }
        okButtonProps={{ disabled: stakeRewards === "none" }}
        visible={open}
        onOk={handleSubmit}
        onCancel={handleClose}
      >
        <div>
          <Typography.Title level={5}>
            Do you want to stake your claim?
          </Typography.Title>
          <Radio.Group
            name="radiogroup"
            onChange={(e) => setStakeRewards(e.target.value)}
            value={stakeRewards}
          >
            <Radio value={"yes"}>Yes</Radio>
            <Radio value={"no"}>No</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </>
  );
};
