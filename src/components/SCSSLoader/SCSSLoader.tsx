import React, { ReactNode, useEffect } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import "../../styles/global.scss";

type Props = {
  children?: ReactNode;
};
export const ThemeStorage = ({ children }: Props) => {
  const { currentTheme } = useThemeSwitcher();
  useEffect(() => {
    if (typeof window === "undefined" || !currentTheme) return;

    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);
  return <>{children}</>;
};
