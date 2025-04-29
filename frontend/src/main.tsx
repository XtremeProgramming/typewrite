import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
