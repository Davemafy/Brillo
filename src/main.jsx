import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

createRoot(rootElement).render(
  <GoogleOAuthProvider clientId={google_client_id}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>,
);
