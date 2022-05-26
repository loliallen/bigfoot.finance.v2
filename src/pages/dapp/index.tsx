import { Typography } from "antd";
import { navigate } from "gatsby";
import React, { useEffect } from "react";

const IndexRedirect = () => {
  useEffect(() => {
    navigate("/dapp/dashboard");
  }, []);
  return null;
};
export default IndexRedirect;
