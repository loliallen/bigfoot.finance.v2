import React, {
  createContext,
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as styles from "./styles.module.scss";

type Context = {
  loaded: boolean;
  onLoaded: () => void;
};

const LoaderContext = createContext<Context>({
  loaded: false,
  onLoaded: () => {},
});

type FootStepProps = {
  style?: CSSProperties;
  className?: string;
};
const FootStep = ({ style, className }: FootStepProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    viewBox="0 0 1800 1800"
    width={35}
    height={35}
  >
    <path d="M1576 1150c-12-18-48-73-116-87-56-11-102 12-121 21-66 32-100 90-105 86s41-63 31-73c-11-11-74 62-183 90-58 16-114 14-116 5-2-11 98-40 95-52-3-9-68 4-70-6-4-13 114-53 111-61-2-8-101 21-106 9-7-17 200-112 191-136-7-17-127 5-161-28-3-2-13-12-10-17 2-5 14-2 24-3 28-4 34-38 55-57 41-36 120-4 122-11 1-6-57-7-95-48-18-20-28-56-48-128-11-40-14-57-17-69-27-97-131-110-220-197-114-112-62-207-152-248-91-41-221 22-280 101-15 21-50 68-38 120 8 32 32 52 39 59 2 2 51 41 109 30 59-12 126-75 131-80 4-4 17-16 35-17 3-1 17-1 28 8 19 14 18 41 18 48-2 44-36 69-30 77 8 9 57-25 64-15 5 5-7 23-18 34-6 5-12 11-22 13-19 4-29-12-45-15-14-1-32 7-68 56-46 63-35 74-71 119-42 52-75 81-75 81-13 11-31 25-37 50-3 12-1 19 2 39 6 51 9 76 1 94-12 27-31 19-50 51-4 7-23 39-13 72 1 5 7 21 50 53 37 27 65 41 65 41 143 67 189 81 247 118 46 30 74 59 122 109 56 58 63 77 132 154 65 71 97 107 129 120 81 32 165-2 225-26 27-11 119-51 194-147 33-43 76-97 83-179 3-25 8-93-36-158z" />
    <path d="M479 493c-1-10-23-9-56-26-43-22-45-46-69-47-29-1-65 32-66 67 0 27 19 46 30 57 61 60 164 48 165 39 2-8-71-18-71-40s69-33 67-50zM303 703c-25-16-42-55-28-83 12-22 38-28 44-29 42-9 91 19 104 59 1 2 12 38-6 56-10 9-27 8-60 6-29-2-44-3-54-9zM232 786c12-32 90-46 122-9 16 18 21 49 8 68-20 30-78 26-109-2-13-13-29-37-21-57zM187 949c4-23 54-39 90-24 26 10 50 38 44 57-7 22-55 29-89 15-22-8-48-30-45-48z" />
    <path d="M270 1005c-13 0-27-2-39-7-20-8-48-30-44-49 1-8 8-15 18-21 17-9 47-14 72-4 26 11 51 39 45 58-3 7-8 12-17 16-10 5-22 7-35 7zm-83-56h1c-2 11 5 21 12 28a100 100 0 00104 21c9-4 15-10 17-16 2-9-1-20-10-32-9-10-21-20-34-25-25-10-55-5-72 4-10 6-16 13-17 20h-1z" />
  </svg>
);

type FootStepsProps = {
  index: number;
};
const FootSteps = ({ index }: FootStepsProps) => {
  return (
    <div className={styles.footsteps}>
      <FootStep
        className={styles.footstep}
        style={
          { transform: "rotate(90deg)", "--index": index + 1 } as CSSProperties
        }
      />
      <FootStep
        className={styles.footstep}
        style={{ transform: "scale(-1, 1)", "--index": index } as CSSProperties}
      />
    </div>
  );
};

export const LoaderProvider: FC = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <LoaderContext.Provider value={{ loaded, onLoaded }}>
      {!loaded && (
        <div className={styles.loader_container}>
          <div>
            <FootSteps index={0} />
            <FootSteps index={2} />
            <FootSteps index={4} />
            <FootSteps index={6} />
            <FootSteps index={8} />
            <FootSteps index={10} />
            <FootSteps index={12} />
            <FootSteps index={14} />
            <FootSteps index={16} />
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
