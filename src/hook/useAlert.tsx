import { Alert, AlertProps } from "antd";
import React, { useContext, useEffect, useState } from "react";

interface IAlert {
  message: string;
  severity: AlertProps["type"];
  open: boolean;
}

interface IAlertContext {
  alert: IAlert;
  openAlert?: OpenAlertFn;
  closeAlert?: () => void;
}

type OpenAlertFn = (message: string, severity?: IAlert["severity"]) => void;

export const AlertContext = React.createContext<IAlertContext>({
  alert: {
    message: "",
    severity: "info",
    open: false,
  },
});

type Props = {
  autoCloseTimeout?: number;
};

export const AlertProvider: React.FC<Props> = ({
  children,
  autoCloseTimeout = 3000,
}) => {
  const [alert, setAlert] = useState<IAlert>({
    message: "",
    severity: "info",
    open: false,
  });
  const openAlert: OpenAlertFn = (message, severity) => {
    setAlert({ message, severity: severity || "info", open: true });
  };
  const closeAlert = () => {
    setAlert((p) => ({ ...p, open: false }));
  };

  useEffect(() => {
    const runTimmer = () =>
      setTimeout(() => {
        closeAlert();
      }, autoCloseTimeout);
    let tid: NodeJS.Timeout | undefined;
    if (alert.open) tid = runTimmer();
    return () => {
      if (tid) clearTimeout(tid);
    };
  }, [alert.open, autoCloseTimeout]);

  return (
    <AlertContext.Provider value={{ alert, openAlert, closeAlert }}>
      <div
        style={{
          position: "fixed",
          bottom: "15px",
          left: "15px",
          width: "30vw",
          zIndex: 100,
        }}
      >
        {alert.open && (
          <Alert
            showIcon
            style={{ wordBreak: "break-all", borderRadius: "15px" }}
            type={alert.severity}
            onClose={closeAlert}
            message={alert.message}
            closable
          ></Alert>
        )}
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
