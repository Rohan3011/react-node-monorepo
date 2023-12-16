import StoreProvider from "@/providers/store";
import QueryProvider from "@/providers/query";
import RouterProvider from "@/providers/router";

const App = () => {
  return (
    <>
      <StoreProvider>
        <QueryProvider>
          <RouterProvider />
        </QueryProvider>
      </StoreProvider>
    </>
  );
};

export default App;
