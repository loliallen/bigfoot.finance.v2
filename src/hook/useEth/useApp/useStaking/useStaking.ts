import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3 from "web3";
import CONTRACTS from "../../../../utils/CONRTACTS";
import { useAlert } from "../../../useAlert";
import { useEth } from "../../useEth";
import { State } from "../interfaces";
import { getPnl } from "./helper";

type Props = {
  isStakeApproved: boolean;
  isUnstakeApproved: boolean;
  updateStakingData: boolean;
  toggleUpdatePermissions: () => void;
  toggleUpdateStakingData: () => void;
};
export const useStaking = ({
  isStakeApproved,
  isUnstakeApproved,
  updateStakingData,
  toggleUpdatePermissions,
  toggleUpdateStakingData,
}: Props) => {
  const { openAlert } = useAlert();
  const {
    contracts: { sbigfoot, bigfoot, staking },
    account,
  } = useEth();
  const [state, set] = useState<State["staking"]>({
    staked: 0,
    total: 0,
    apy: 0,
    rebase_in: new Date(),
    pnl: {
      diff: 0,
      percents: "0%",
    },
  });

  const approveStaking = async () => {
    if (isStakeApproved) return;
    try {
      const base2 = Web3.utils.toBN("2");
      const res = base2.pow(Web3.utils.toBN("256")).sub(Web3.utils.toBN("1"));
      await bigfoot.methods
        .approve(CONTRACTS["staking"].address, res)
        .send({ from: account });
      toggleUpdatePermissions();
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
    }
  };
  const approveUnstaking = async () => {
    if (isUnstakeApproved) return;
    try {
      const base2 = Web3.utils.toBN("2");
      const res = base2.pow(Web3.utils.toBN("256")).sub(Web3.utils.toBN("1"));
      await sbigfoot.methods
        .approve(CONTRACTS["staking"].address, res)
        .send({ from: account });
      toggleUpdatePermissions();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
    }
  };

  const stake = async (value: string) => {
    try {
      openAlert &&
        openAlert(`Please wait until the transaction is confirmed`, "info");
      let n;
      await staking.methods.stake(value, account).send({ from: account });
      openAlert && openAlert(`Successfully staked ${value}`, "success");
      toggleUpdateStakingData();
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
    }
  };
  const unstake = async (value: string) => {
    // console.log(typeof value);
    try {
      openAlert &&
        openAlert(`Please wait until the transaction is confirmed`, "info");
      await staking.methods.unstake(value).send({ from: account });
      openAlert && openAlert(`Successfully unstaked ${value}`, "success");
      toggleUpdateStakingData();
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
      console.error(e);
    }
  };

  const calculateApy = async () => {
    /*
		const epoch = await staking.epoch()
		const delta = epoch.delta
		const duration = epoch.duration
		const totalStaked = staking.balanceStaked()
		const totalRewards = delta / totalStaked
		const apyYear = Math.pow(1 + stakingReward, 365 * (24*3600) / duration) - 1;
      */
    const epoch = await staking.methods.epoch().call();
    const delta = Number(epoch.delta);
    const duration = Number(epoch.duration);
    const totalStaked = Number(await staking.methods.balanceStaked().call());
    const totalRewards = isNaN(delta / totalStaked) ? 0 : delta / totalStaked;
    const rebase_in = new Date(Number(epoch.end) * 1000);
    const apyYear =
      Math.pow(1 + totalRewards, (365 * (24 * 3600)) / duration) - 1;
    return { apy: apyYear, rebase_in };
  };

  const getBalance = async () => {
    const total = await staking.methods.balanceStaked().call();
    const owned = await sbigfoot.methods.balanceOf(account).call();
    const { apy, rebase_in } = await calculateApy();
    const pnl = await getPnl(
      account,
      Number(ethers.utils.formatUnits(owned, 18))
    );
    set({
      total: total,
      staked: owned,
      apy: apy,
      rebase_in,
      pnl,
    });
  };

  useEffect(() => {
    if (staking && account && sbigfoot) getBalance();
  }, [staking, account, sbigfoot, updateStakingData]);

  useEffect(() => {
    if (state.rebase_in.getTime() > Date.now()) return;
    let iid = setInterval(() => {
      toggleUpdateStakingData();
      console.log("toggleUpdate");
    }, 3000);
    return () => clearInterval(iid);
  }, [state.rebase_in]);

  return {
    state,
    methods: {
      approve: {
        staking: approveStaking,
        unstaking: approveUnstaking,
      },
      stake,
      unstake,
    },
  };
};
