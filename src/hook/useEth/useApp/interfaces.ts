export type Rewards = {
  perNode: number;
  perDay: number;
  pending: number;
};

export type State = {
  balance: {
    bgft: number;
    stable: number;
    bgft_price: number;
  };
  staking: {
    total: number;
    staked: number;
    apy: number;
    rebase_in: Date;
    pnl: {
      diff: number;
      percents: string;
    };
  };
  rewards: Rewards;
  nodes: {
    owned: number;
    sold: number;
    total: number;
    left: {
      total: number;
      price: number;
      count: number;
    };
  };
  rewardsData: {
    data: Reward[];
  };
};

export type Permissions = {
  isStakeApproved: boolean;
  isUnstakeApproved: boolean;
  isStableApproved: boolean;
  isPresale: boolean;
  isWhiteListed: boolean;
  isMintOpened: boolean;
};

export type Additional = {
  tokens: IToken[];
};

export type Context = {
  state: State;
  methods: Methods;
  permissions: Permissions;
  additional: Additional;
};

export type Methods = {
  nodes: {
    approve: () => void;
    purchaseNodes: (count?: number) => void;
    claimNodes: (id: string | string[], stake_rewards: boolean) => void;
  };
  balance: {
    getToken: () => void;
    addERC20Token: (type: "bgft" | "usdc") => void;
  };
  staking: {
    approve: {
      staking: () => void;
      unstaking: () => void;
    };
    stake: (value: string) => void;
    unstake: (value: string) => void;
  };
};

export interface IToken {
  id: string;
  reward: number;
  staked: string;
}
export type Reward = {
  _id: string;
  date: Date;
  amount: string;
  address: string;
  tx: string;
};
