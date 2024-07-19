import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return <h4>An error happened</h4>;
};

export default ErrorElement;
