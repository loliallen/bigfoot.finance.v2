import React from "react";
import { CSSProperties } from "react";
import clsx from "clsx";
import * as styles from "./styles.module.scss";

type ParticleProps = {
  color: string;
  rotate: number;
  style?: CSSProperties;
  size?: number;
};
const Particle = ({ color, style, rotate, size = 48 }: ParticleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    style={{
      ...style,
      position: "absolute",
      transform: `rotate(${rotate}deg)`,
    }}
  >
    <path
      stroke="none"
      fill={color}
      d="M17.071796769724 6.4522505883591a8 8 0 0 1 13.856406460551 0l15.643593539449 27.095498823282a8 8 0 0 1 -6.9282032302755 12l-31.287187078898 0a8 8 0 0 1 -6.9282032302755 -12"
    ></path>
  </svg>
);

type Props = {
  rotation?: number;
  hide?: boolean;
};
export const Particles = ({ rotation = 180, hide }: Props) => {
  const width = 1920;
  const d1 = 1920 / 30;
  const d2 = 1920 / 45;
  const d3 = 1920 / 40;

  return (
    <div
      id="particles"
      className={clsx(styles.container, hide && styles.should_hidden)}
    >
      <Particle
        rotate={rotation}
        color="#A2B6BF"
        style={{ right: "-2.5vw", top: "4vh" }}
        size={width / d1}
      />
      <Particle
        rotate={rotation}
        color="white"
        style={{ right: "-4vw", top: "-2vh" }}
        size={width / d2}
      />
      <Particle
        rotate={rotation}
        color="#9DC8E4"
        style={{ right: "-7vw", top: "2vh" }}
        size={width / d3}
      />
    </div>
  );
};
