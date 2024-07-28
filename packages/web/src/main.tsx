import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Restuarant from "./pages/Restuarant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/restaurant/:restaurantId/",
    element: <Restuarant />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
