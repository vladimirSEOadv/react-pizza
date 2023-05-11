import React from "react";
import { Loader } from "../Loader/Loader";
import Skeleton from "./Skeleton";
import styles from "./BlockWrapper.module.scss";

export const BlockWrapper = ({ error, loading, data }) => {
  return (
    <>
      {error ? (
        <Loader error={error} />
      ) : loading ? (
        <div className={styles.skeletonWrapper}>
          <Skeleton count={6} />
        </div>
      ) : (
        !error && !data.length && <h1 className={styles.center}>Данных нет</h1>
      )}
    </>
  );
};
