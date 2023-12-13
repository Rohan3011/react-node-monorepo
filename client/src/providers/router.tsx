import React from "react";
import { BrowserRouter } from "react-router-dom";

const RouterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
