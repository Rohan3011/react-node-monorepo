import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";
import ContactPage from "./contact";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

export default pages;
