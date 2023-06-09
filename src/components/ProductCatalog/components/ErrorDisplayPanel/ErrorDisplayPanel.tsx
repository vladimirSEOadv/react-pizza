import React from "react";
import styles from "./ErrorDisplayPanel.module.scss";

interface ErrorDisplayPanelProps {
  error: {
    message: string;
    name: string;
  };
}

export const ErrorDisplayPanel: React.FC<ErrorDisplayPanelProps> = (props) => {
  console.log("props", props);
  const { message, name } = props.error;
  return (
    <div className={styles.errorDisplayPanel}>
      <h1>{name}</h1>
      <h3>{message}</h3>
    </div>
  );
};
