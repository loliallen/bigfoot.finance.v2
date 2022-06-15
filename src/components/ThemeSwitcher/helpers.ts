import { Context } from "./interfaces";

export const LIGHT_PALETTE: Context["palette"] = {
  primary: "#9DC8E4",
  secondary: "#A2B6BF",
  background: "#ffffff",
};
export const DARK_PALETTE: Context["palette"] = {
  primary: "#9DC8E4",
  secondary: "#A2B6BF",
  background: "#ffffff",
};

export const INITIAL_CONTEXT_STATE: Context = {
  mode: "light",
  palette: LIGHT_PALETTE,
  toggle: () => {},
};
