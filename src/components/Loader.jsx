import React from "react";

export const Loader = ({ error }) => {
  const message = error ? error.toString() : "Loading...";
  return (
    <div style={{ margin: "100px auto" }}>
      <h1>{message}</h1>
    </div>
  );
};
