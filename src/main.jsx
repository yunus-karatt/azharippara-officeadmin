import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import AppProviders from "../Context/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <StrictMode>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{ duration: 3000, style: { borderRadius: 0 } }}
      />
    </StrictMode>
  </AppProviders>
);
