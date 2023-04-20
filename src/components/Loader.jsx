import React from "react";

export const Loader = ({ error }) => {
  const message = error ? error.toString() : "Loading...";
  return (
    <div>
      <h1 style={{ margin: "100px auto" }}>{message}</h1>
    </div>
  );
};
