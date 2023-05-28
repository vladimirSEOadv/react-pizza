import React from "react";
import styles from "./ErrorDisplayPanel.module.scss";

export const ErrorDisplayPanel = (props) => {
  const { message, name } = props.error;
  return (
    <div className={styles.errorDisplayPanel}>
      <h1>{name}</h1>
      <h3>{message}</h3>
    </div>
  );
};
