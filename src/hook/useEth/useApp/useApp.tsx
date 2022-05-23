import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contract } from "web3-eth-contract";
import { Context } from "./interfaces";
import {
  INITAL_ADDITIONAL,
  INITAL_METHODS,
  INITAL_PERMISSIONS,
  INITAL_STATE,
} from "./helpers";
import { useEth } from "../useEth";
import { useBalance } from "./useBalance/useBalance";
import { useNodes } from "./useNodes/useNodes";
import { useStaking } from "./useStaking/useStaking";
import { useRewards } from "./useRewards/useRewards";
import CONTRACTS from "../../../utils/CONRTACTS";

const AppContext = createContext<Context>({
  state: INITAL_STATE,
  methods: INITAL_METHODS,
  permissions: INITAL_PERMISSIONS,
  additional: INITAL_ADDITIONAL,
});

type Props = {
  children?: ReactNode;
};
export const AppProvider = ({ children }: Props) => {
  const {
    account,
    contracts: { yeti, logic, mstable, bigfoot, sbigfoot },
  } = useEth();
  const [isStakeApproved, setIsStakeApproved] = useState(false);
  const [isUnstakeApproved, setIsUnstakeApproved] = useState(false);
  const [isStableApproved, setIsStableApproved] = useState(false);

  const [isPresale, setIsPresale] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isMintOpened, setIsMintOpened] = useState(false);

  const [updateNodesData, setUpdateNodesData] = useState(false);
  const toggleUpdateNodesData = () => setUpdateNodesData((p) => !p);
  const [updatePermissions, setUpdatePermissions] = useState(false);
  const toggleUpdatePermissions = () => setUpdatePermissions((p) => !p);
  const [updateStakingData, setUpdateStakingData] = useState(false);
  const toggleUpdateStakingData = () => setUpdateStakingData((p) => !p);
  const [updateRewardsData, setUpdateRewardsData] = useState(false);
  const toggleUpdateRewardsData = () => setUpdateRewardsData((p) => !p);

  const { balance, getTokens } = useBalance({
    updateNodesData,
    updateStakingData,
  });
  const {
    nodes,
    rewards,
    methods: nodeMethods,
    tokens,
  } = useNodes({
    isPresale,
    isWhiteListed,
    isMintOpened,
    isStableApproved,
    toggleUpdatePermissions,
    toggleUpdateNodesData,
    toggleUpdateStakingData,
    toggleUpdateRewardsData,
    updateNodesData,
  });

  const { methods: stakingMethods, state: staking } = useStaking({
    isStakeApproved,
    isUnstakeApproved,
    updateStakingData,
    toggleUpdatePermissions,
    toggleUpdateStakingData,
  });

  const { rewards: rewardsData } = useRewards({ updateRewardsData });

  const checkPermissions = async () => {
    const is_mint_opened = await yeti.methods.openMintNft().call();
    setIsMintOpened(is_mint_opened);
    const is_presale = await logic.methods.presale().call();
    setIsPresale(is_presale);
    // setIsPresale(false);
    const is_whitelisted = await logic.methods.whitelisted(account).call();
    setIsWhiteListed(is_whitelisted);
    // setIsWhiteListed(true);
    const is_stable_approved = Boolean(
      Number(
        await mstable.methods
          .allowance(account, CONTRACTS["logic"].address)
          .call()
      )
    );
    setIsStableApproved(is_stable_approved);
    const is_stake_approved = Boolean(
      Number(
        await bigfoot.methods
          .allowance(account, CONTRACTS["staking"].address)
          .call()
      )
    );
    setIsStakeApproved(is_stake_approved);

    const is_unstake_approved = Boolean(
      Number(
        await sbigfoot.methods
          .allowance(account, CONTRACTS["staking"].address)
          .call()
      )
    );
    setIsUnstakeApproved(is_unstake_approved);
  };

  const addERC20Token = async (type: "bgft" | "usdc" = "usdc") => {
    const { ethereum } = window;
    let contract: Contract;
    if (type === "usdc") contract = mstable;
    else contract = bigfoot;

    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();
    const added = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address:
            type === "bgft"
              ? CONTRACTS["bigfoot"].address
              : CONTRACTS["mstable"].address, // The address that the token is at.
          symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: decimals, // The number of decimals in the token
        },
      },
    });
  };

  useEffect(() => {
    if (yeti && logic && mstable && account) checkPermissions();
  }, [account, yeti, logic, mstable, updatePermissions]);

  return (
    <AppContext.Provider
      value={{
        state: {
          balance,
          nodes,
          rewards,
          staking,
          rewardsData: { data: rewardsData },
        },
        methods: {
          nodes: nodeMethods,
          balance: { getToken: getTokens, addERC20Token },
          staking: stakingMethods,
        },
        permissions: {
          isStakeApproved,
          isStableApproved,
          isPresale,
          isWhiteListed,
          isMintOpened,
          isUnstakeApproved,
        },
        additional: {
          tokens,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
