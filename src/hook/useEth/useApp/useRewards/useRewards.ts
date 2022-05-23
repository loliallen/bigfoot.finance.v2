import { useEffect, useState } from "react";
import { useEth } from "../../useEth";
import { Reward } from "../interfaces";

type Props = {
  updateRewardsData: boolean;
};

export const useRewards = ({ updateRewardsData }: Props) => {
  const { account } = useEth();
  const [rewards, setRewards] = useState<Reward[]>([]);

  const getRewards = async () => {
    try {
      const res = await fetch(`/api/rewards?address=${account}`);
      const data = await res.json();
      setRewards(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (account) getRewards();
  }, [updateRewardsData, account]);
  return {
    rewards,
  };
};
