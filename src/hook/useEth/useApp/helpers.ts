import { Additional, Methods, Permissions, State } from "./interfaces";

export const INITAL_STATE: State = {
  balance: {
    bgft: 0,
    bgft_price: 0,
    stable: 0,
  },
  staking: {
    total: 0,
    staked: 0,
    apy: 0,
    rebase_in: new Date(),
    pnl: {
      diff: 0,
      percents: "0%",
    },
  },
  rewards: {
    perDay: 0,
    perNode: 0,
    pending: 0,
  },
  nodes: {
    left: {
      total: 0,
      count: 0,
      price: 0,
    },
    sold: 0,
    total: 50000,
    owned: 0,
  },
  rewardsData: {
    data: [],
  },
};

export const INITAL_METHODS: Methods = {
  nodes: {
    approve: () => {},
    purchaseNodes: () => {},
    claimNodes: () => {},
  },
  balance: {
    getToken: () => {},
    addERC20Token: () => {},
  },
  staking: {
    approve: {
      staking: () => {},
      unstaking: () => {},
    },
    stake: () => {},
    unstake: () => {},
  },
};

export const INITAL_PERMISSIONS: Permissions = {
  isStakeApproved: false,
  isUnstakeApproved: false,
  isStableApproved: false,
  isPresale: false,
  isWhiteListed: false,
  isMintOpened: false,
};

export const INITAL_ADDITIONAL: Additional = {
  tokens: [],
};
