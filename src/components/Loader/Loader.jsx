import React from "react";
import styles from "./Loader.module.scss";

export const Loader = ({ error }) => {
  const message = error ? error.toString() : "Loading...";
  return (
    <div className={styles.root}>
      <h1>{message}</h1>
    </div>
  );
};
