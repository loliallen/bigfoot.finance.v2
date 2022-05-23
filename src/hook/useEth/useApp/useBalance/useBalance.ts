import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useEth } from "../../useEth";
import { INITAL_STATE } from "../helpers";
import { State } from "../interfaces";
import { useDevStable } from "../useDevStable/useDevStable";

type Props = {
  updateNodesData: boolean;
  updateStakingData: boolean;
};
export const useBalance = ({ updateNodesData, updateStakingData }: Props) => {
  const {
    account,
    contracts: { bigfoot, mstable },
  } = useEth();
  const [balance, set] = useState<State["balance"]>(INITAL_STATE.balance);
  const { balance: devBalanceStable, getTokens } = useDevStable({
    updateNodesData,
  });
  const getBGFTPrice = async () => {
    const pair_addr = "0xB7AFF638055EA70C72190939407d4e9f27477338";
    const stableBigNumber = await mstable.methods.balanceOf(pair_addr).call();
    const bigFootBigNumber = await bigfoot.methods.balanceOf(pair_addr).call();
    const _price =
      parseFloat(ethers.utils.formatUnits(stableBigNumber, 6)) /
      parseFloat(ethers.utils.formatUnits(bigFootBigNumber, 18));
    const price = isNaN(_price) ? 0 : _price;
    set((p) => ({ ...p, bgft_price: price }));
  };
  const getBGFTBalance = async () => {
    const balance = await bigfoot.methods.balanceOf(account).call();
    // console.log("balance", balance);
    set((p) => ({ ...p, bgft: balance }));
  };

  useEffect(() => {
    set((p) => ({ ...p, stable: devBalanceStable }));
  }, [devBalanceStable]);

  useEffect(() => {
    if (account && bigfoot) getBGFTBalance();
  }, [account, bigfoot, updateNodesData, updateStakingData]);
  useEffect(() => {
    if (bigfoot && mstable) getBGFTPrice();
  }, [bigfoot, mstable, updateNodesData, updateStakingData]);

  return {
    balance,
    getTokens,
  };
};
