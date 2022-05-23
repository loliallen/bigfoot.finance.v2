import React, { useRef } from "react";
import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import spLogo from "../../images/spining_logo1.gif";
import * as styles from "./styles.module.scss";
import { Link } from "@reach/router";
import { Button } from "antd";
import { Particles } from "../../components/Particles/Particles";

type Props = {
  data: Record<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    { header: string; description: string; subheader?: string }
  >;
};

export const Content = ({ data: Data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.frame} id="0">
        <div className={styles.title}>
          <h1 data-aos="fade-in">{Data[0].header}</h1>
        </div>
        <p
          data-aos="fade-in"
          data-aos-deplay="1000"
          className={styles.description}
        >
          {Data[0].description}
        </p>
      </div>
      <div className={styles.frame} id="1">
        <div />
        <div>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[1].header}</h1>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[1].description}
          </p>
        </div>
      </div>
      <div className={styles.frame} id="2">
        <div className={styles.title}>
          <h1 data-aos="fade-in">{Data[2].header}</h1>
        </div>
        <p
          data-aos="fade-in"
          data-aos-deplay="1000"
          className={styles.description}
        >
          {Data[2].description}
        </p>
      </div>
      <div className={styles.frame} id="3">
        <div className={styles.background}>
          <img src={img2} />
        </div>
        <div className={styles.foreground}>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[3].header}</h1>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[3].description}
          </p>
        </div>
      </div>
      <div className={styles.frame} id="4">
        <div className={styles.background}>
          <img src={img1} />
        </div>
        <div className={styles.foreground}>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[4].header}</h1>
            <h2 data-aos="fade-in">{Data[4].subheader}</h2>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[4].description}
          </p>
        </div>
      </div>
      <div className={styles.frame} id="5">
        <div className={styles.background}>
          <img src={img3} />
        </div>
        <div className={styles.foreground}>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[5].header}</h1>
            <h2 data-aos="fade-in">{Data[5].subheader || ""}</h2>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[5].description}
          </p>
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.background}>
          <div className={styles.particles}>
            <Particles rotation={90} />
          </div>
        </div>
        <div className={styles.title}>
          <h1 data-aos="fade-in">{Data[6].header}</h1>
          <h2 data-aos="fade-in">{Data[6].subheader || ""}</h2>
        </div>
        <p
          data-aos="fade-in"
          data-aos-deplay="1000"
          className={styles.description}
        >
          {Data[6].description}
        </p>
      </div>
      <div className={styles.frame}>
        <div className={styles.background}>
          <img src={img1} />
        </div>
        <div className={styles.foreground}>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[7].header}</h1>
            <h2 data-aos="fade-in">{Data[7].subheader || ""}</h2>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[7].description}
          </p>
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.background}>
          <img src={img3} />
        </div>
        <div className={styles.foreground}>
          <div className={styles.title}>
            <h1 data-aos="fade-in">{Data[8].header}</h1>
            <h2 data-aos="fade-in">{Data[8].subheader || ""}</h2>
          </div>
          <p
            data-aos="fade-in"
            data-aos-deplay="1000"
            className={styles.description}
          >
            {Data[8].description}
          </p>
        </div>
      </div>
      <div className={styles.frame}>
        <img src={spLogo} style={{ width: 240, height: 240 }} />
        <Link to="/dapp">
          <Button size="large" shape="round" type="primary">
            buy node
          </Button>
        </Link>
      </div>
    </div>
  );
};
