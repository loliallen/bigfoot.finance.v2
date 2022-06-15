import React, { ReactNode, useEffect, useState } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

import "../../styles/themes/dark.less";
import "../../styles/themes/light.less";
import { ThemeStorage } from "../SCSSLoader";

const themes = {
  dark: `/dark.css`,
  light: `/light.css`,
};

type Props = {
  children?: ReactNode;
  ignoreStored?: boolean;
};
export const ThemeProvider = ({ children, ignoreStored }: Props) => {
  const [defaultTheme, setDefaultTheme] = useState("light");

  useEffect(() => {
    if (typeof window === "undefined" || ignoreStored) return;
    const storedTheme = localStorage.getItem("theme");
    storedTheme && setDefaultTheme(storedTheme);
  }, []);
  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={defaultTheme}>
      <ThemeStorage>{children}</ThemeStorage>
    </ThemeSwitcherProvider>
  );
};
