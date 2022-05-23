import yeti from "./abis/Yeti.json";
import sbigfoot from "./abis/sBigFoot.json";
import bigfoot from "./abis/BigFoot.json";
import staking from "./abis/Staking.json";
import logic from "./abis/Logic.json";
import mstable from "./abis/mStable.json";
import { AbiItem } from "web3-utils";

const Abis = {
  logic: logic as AbiItem[],
  bigfoot: bigfoot as AbiItem[],
  sbigfoot: sbigfoot as AbiItem[],
  yeti: yeti as AbiItem[],
  staking: staking as AbiItem[],
  mstable: mstable as AbiItem[],
};

console.log(Abis);
export default Abis;
