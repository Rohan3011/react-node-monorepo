import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default pages;
