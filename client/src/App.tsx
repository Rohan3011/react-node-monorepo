import React from "react";
import RouterProvider from "@/providers/router";
import StoreProvider from "@/providers/store";
import QueryProvider from "@/providers/query";

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <RouterProvider>
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
        </StoreProvider>
      </RouterProvider>
    </>
  );
};

export default App;
