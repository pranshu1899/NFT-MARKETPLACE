import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { BlockchainProvider } from "./context/BlockchainContext";

import "./styles/globals.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BlockchainProvider>
        <App />
      </BlockchainProvider>
    </BrowserRouter>
  </StrictMode>
);