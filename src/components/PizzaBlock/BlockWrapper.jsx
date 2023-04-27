import React from "react";
import { Loader } from "../Loader";
import Skeleton from "./Skeleton";

export const BlockWrapper = ({ error, loading, data }) => {
  return (
    <>
      {error && <Loader error={error} />}
      {loading && <Skeleton count={6} />}
      {!error && !data.length && <h1 className={"title"}>Данных нет</h1>}
    </>
  );
};
