import { useEffect, useState } from "react";
import Web3 from "web3";
import CONTRACTS from "../../../../utils/CONRTACTS";
import { useAlert } from "../../../useAlert";
import { useEth } from "../../useEth";
import { INITAL_STATE } from "../helpers";
import { IToken, State } from "../interfaces";
import { getCurrentNodesPrice } from "./helpers";

type Props = {
  isPresale: boolean;
  isWhiteListed: boolean;
  isStableApproved: boolean;
  isMintOpened: boolean;

  updateNodesData: boolean;
  toggleUpdateNodesData: () => void;
  toggleUpdateStakingData: () => void;
  toggleUpdatePermissions: () => void;
  toggleUpdateRewardsData: () => void;
};
export const useNodes = ({
  isMintOpened,
  isPresale,
  isStableApproved,
  isWhiteListed,
  updateNodesData,
  toggleUpdateNodesData,
  toggleUpdateStakingData,
  toggleUpdatePermissions,
  toggleUpdateRewardsData,
}: Props) => {
  const { openAlert } = useAlert();
  const { contracts, account } = useEth();
  const { yeti, logic, mstable } = contracts;
  const [nodes, set] = useState<State["nodes"]>(INITAL_STATE.nodes);
  const [rewards, setRewards] = useState<State["rewards"]>(
    INITAL_STATE.rewards
  );
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [tokens, setTokens] = useState<IToken[]>([]);

  const getRewardsForTokens = async () => {
    const prs = tokenIds.map((e) =>
      logic.methods
        .lastClaimTime(e)
        .call()
        .then((r: string) => {
          return r !== "0" ? logic.methods.pendingOf(e).call() : r;
        })
    );
    const data = await Promise.all(prs);
    setTokens(
      tokenIds.map((e, i) => ({
        id: e,
        reward: Number(data[i]) / Math.pow(10, 18),
        staked: "-",
      }))
    );
    const dR =
      (await logic.methods.dailyRewards().call({ from: account })) /
      Math.pow(10, 18);
    setRewards((p) => ({
      ...p,
      perDay: dR * nodes.owned,
      pending: data.reduce((r, i) => r + Number(i), 0) / Math.pow(10, 18),
      perNode: dR,
    }));
  };

  const getAllAccountTokens = async () => {
    if (nodes.owned > 50) {
      let data: string[] = [];
      for (let i = 0; i < nodes.owned; i += 50) {
        try {
          const res = await yeti.methods
            .tokensOfOwnerByIndexesBetween(
              account,
              i,
              i + 50 > nodes.owned ? nodes.owned : i + 50
            )
            .call();
          data = data.concat(res);
        } catch (e) {}
      }
      setTokenIds(data);
    } else {
      const data = await yeti.methods.tokensOfOwner(account).call();
      setTokenIds(data);
    }
  };

  const getBalance = async () => {
    const balance = await yeti.methods.balanceOf(account).call();
    return balance;
  };

  const getNodes = async () => {
    const created = await yeti.methods.totalSupply().call();
    const owned = await getBalance();
    const [left, price] = getCurrentNodesPrice(created);
    set((p) => ({
      ...p,
      owned,
      sold: created,
      left: { ...p.left, total: p.total, count: left, price },
    }));
  };
  const approve = async () => {
    openAlert &&
      openAlert(`Please wait until the transaction is confirmed`, "info");
    const base2 = Web3.utils.toBN("2");
    const res = base2.pow(Web3.utils.toBN("256")).sub(Web3.utils.toBN("1"));
    const approved = await mstable.methods
      .approve(CONTRACTS["logic"].address, res)
      .send({ from: account });
    toggleUpdateNodesData();
    toggleUpdatePermissions();
    return approved;
  };
  const checkApprove = async () => {
    let restart = false;
    if (!isMintOpened) return { approved: false, restart: false };
    if (!isStableApproved) {
      await approve();
      restart = true;
    }

    if (isPresale) {
      if (isWhiteListed) return { approved: isStableApproved, restart };
      else return { approved: false, restart };
    } else return { approved: isStableApproved, restart };
  };

  const purchaseNodes = async (count: number = 1) => {
    try {
      if (!account) throw new Error("Please connect account to website");
      const { approved, restart } = await checkApprove();
      if (!approved && !restart)
        throw new Error("You have no permissions to mint a nodes");
      let tx: any;

      openAlert &&
        openAlert(`Please wait until the transaction is confirmed`, "info");
      if (count > 1)
        tx = await yeti.methods.safeMintBatch(count).send({ from: account });
      else tx = await yeti.methods.safeMint().send({ from: account });
      openAlert && openAlert("Nodes was successfully created", "success");
      toggleUpdateNodesData();
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
      console.error("purchaseNodes", e);
    }
  };

  const claimNodes = async (id: string | string[], stake_rewards: boolean) => {
    try {
      if (isPresale) throw new Error("Presale is not over yet");
      let tx;
      if (Array.isArray(id))
        tx = await yeti.methods
          .safeClaimBatch(id, stake_rewards)
          .send({ from: account });
      else
        tx = await yeti.methods
          .safeClaim(id, stake_rewards)
          .send({ from: account });
      toggleUpdateNodesData();
      toggleUpdateStakingData();
      toggleUpdateRewardsData();
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
    }
  };

  useEffect(() => {
    let iid = setInterval(() => {
      toggleUpdateNodesData();
    }, 15000);
    return () => {
      if (iid) clearInterval(iid);
    };
  }, []);

  useEffect(() => {
    if (account && yeti) getNodes();
  }, [account, yeti, updateNodesData]);

  useEffect(() => {
    if (nodes.owned > 0) getAllAccountTokens();
  }, [nodes.owned, updateNodesData]);

  useEffect(() => {
    if (tokenIds.length > 0) getRewardsForTokens();
  }, [tokenIds, updateNodesData]);

  return {
    nodes,
    rewards,
    methods: { purchaseNodes, claimNodes, approve },
    tokens,
  };
};
