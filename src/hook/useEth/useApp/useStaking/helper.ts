import { State } from "../interfaces";

export const getPnl = async (
  address: string,
  current_amount: number
): Promise<State["staking"]["pnl"]> => {
  try {
    const res = await fetch(
      `/api/stake?address=${address}&current_amount=${current_amount}`
    );
    if (!res.ok) throw new Error("Bad request");
    const data = await res.json();
    return data;
  } catch (e) {
    return {
      diff: 0,
      percents: "0%",
    };
  }
};
