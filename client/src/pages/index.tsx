import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";
import ContactPage from "./contact";
import { checkHealth } from "@/api/home";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: checkHealth,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

export default pages;
