import React from "react";
import { RecoilRoot } from "recoil";

const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default StoreProvider;
