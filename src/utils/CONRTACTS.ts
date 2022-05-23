import Abis from "../data/contract";
import { ContractProps } from "../hook/useEth";
import config from "./config";

const CONTRACTS: Record<string, ContractProps> = {
  yeti: {
    abi: Abis["yeti"],
    address: config.CONTRACT_ADDRESSES.yeti,
  },
  bigfoot: {
    abi: Abis["bigfoot"],
    address: config.CONTRACT_ADDRESSES.bigfoot,
  },
  sbigfoot: {
    abi: Abis["sbigfoot"],
    address: config.CONTRACT_ADDRESSES.sbigfoot,
  },
  staking: {
    abi: Abis["staking"],
    address: config.CONTRACT_ADDRESSES.staking,
  },
  logic: {
    abi: Abis["logic"],
    address: config.CONTRACT_ADDRESSES.logic,
  },
  mstable: {
    abi: Abis["mstable"],
    address: config.CONTRACT_ADDRESSES.mstable,
  },
};
export default CONTRACTS;
