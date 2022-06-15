import React from "react";
import { Card as AntCard, CardProps } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

export const Card = ({ style, ...props }: CardProps) => {
  const { currentTheme } = useThemeSwitcher();
  return (
    <AntCard
      {...props}
      style={style}
      headStyle={{ color: currentTheme === "light" ? "gray" : "white" }}
    />
  );
};
