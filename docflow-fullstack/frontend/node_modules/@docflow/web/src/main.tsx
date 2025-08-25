import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
