import React from "react";
import { Loader } from "../Loader";
import Skeleton from "./Skeleton";

export const BlockWrapper = ({ error, loading, data, children }) => {
  return (
    <>
      {error && <Loader error={error} />}
      {loading &&
        [...new Array(6)].map((_, index) => {
          return <Skeleton key={index} />;
        })}
      {!data.length && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px",
            width: "100%",
          }}
        >
          Данных нет
        </h1>
      )}
      {children}
    </>
  );
};
