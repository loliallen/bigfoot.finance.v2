import React from "react";
import { Card as AntCard, CardProps } from "antd";

export const Card = ({ style, ...props }: CardProps) => {
  return (
    <AntCard
      {...props}
      style={{ ...style, borderRadius: "15px" }}
      headStyle={{ color: "gray" }}
    />
  );
};
