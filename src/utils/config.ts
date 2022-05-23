const CONTRACT_ADDRESSES = {
  yeti: process.env.REACT_APP_YETI_ADDRESS || "",
  bigfoot: process.env.REACT_APP_BIGFOOT_ADDRESS || "",
  sbigfoot: process.env.REACT_APP_SBIGFOOT_ADDRESS || "",
  staking: process.env.REACT_APP_STAKING_ADDRESS || "",
  logic: process.env.REACT_APP_LOGIC_ADDRESS || "",
  mstable: process.env.REACT_APP_STABLE_ADDRESS || "",
  pair: process.env.REACT_APP_PAIR_ADDRESS || "",
};

const config = {
  CONTRACT_ADDRESSES,
  IS_TESTNET: process.env.REACT_APP_IS_TESTNET === "true",
};

console.log(config);
export default config;
