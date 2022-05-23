import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useEth } from "../../useEth";

type Props = {
  updateNodesData: boolean;
};
export const useDevStable = ({ updateNodesData }: Props) => {
  const [balance, setBalance] = useState(0);
  const { contracts, account } = useEth();
  const { mstable } = contracts;

  const getBalance = async () => {
    const balance = await mstable.methods.balanceOf(account).call();
    const base10 = Web3.utils.toBN("10");
    const div = base10.pow(Web3.utils.toBN("6"));

    setBalance(Number(ethers.utils.formatUnits(balance, 6).toString()));
  };
  const getTokens = async () => {
    try {
      const data = await mstable.methods.getToken().send({ from: account });
      await getBalance();
    } catch (e) {}
  };

  useEffect(() => {
    if (account && mstable) getBalance();
  }, [account, mstable, updateNodesData]);

  return {
    balance,
    getTokens,
  };
};
