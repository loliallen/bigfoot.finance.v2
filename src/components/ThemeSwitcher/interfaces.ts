export type Context = {
  mode: "light" | "dark";
  palette: {
    primary: string;
    secondary: string;
    background: string;
  };
  toggle: () => void;
};
