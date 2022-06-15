import React, { ReactNode, useState } from "react";
import { Button, Layout, Typography } from "antd";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "@reach/router";
import { CSSProperties } from "react";
import * as styles from "./styles.module.scss";
import { useThemeSwitcher } from "react-css-theme-switcher";

type Props = {
  showLogo?: boolean;
  links: { label: string; uri: string; out: boolean }[];
  layoutProps?: CSSProperties;
  typographyProps?: { color: string };
  button: ReactNode;
};

export const _Header = ({
  showLogo,
  links,
  button,
  layoutProps = { position: "relative" },
  typographyProps = { color: "black" },
}: Props) => {
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Layout.Header
        className="header"
        style={{ position: layoutProps.position }}
      >
        <div className="header_content">
          <Link to="/" style={{ height: "100%" }}>
            {showLogo && (
              <div className="logo">
                <img src={"/logo.svg"} alt="logo" />
              </div>
            )}
          </Link>
          <div className="nav">
            {links.map((e, i) =>
              e.out ? (
                <a href={e.uri} target="_blank" key={i}>
                  <Typography.Text
                    style={{
                      margin: "0 2rem 0",
                      color: typographyProps.color,
                      fontSize: "16px",
                    }}
                  >
                    {e.label}
                  </Typography.Text>
                </a>
              ) : (
                <Link to={e.uri} key={i}>
                  <Typography.Text
                    style={{
                      margin: "0 2rem 0",
                      color: typographyProps.color,
                      fontSize: "16px",
                    }}
                  >
                    {e.label}
                  </Typography.Text>
                </Link>
              )
            )}
          </div>
          <div>{button}</div>

          <Button
            className="nav_menu_btn"
            type="primary"
            shape="circle"
            onClick={() => {
              console.log("clicked");
            }}
            icon={open ? <AiOutlineClose /> : <AiOutlineMenu />}
          />
        </div>
      </Layout.Header>
      {open && (
        <div className={styles.container}>
          <div className={styles.menu}>
            {links.map((e, i) => (
              <Link to={e.uri} key={i}>
                <Button type="text">{e.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
