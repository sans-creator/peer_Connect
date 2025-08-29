import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  console.error("❌ Missing VITE_CLERK_PUBLISHABLE_KEY in .env");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ClerkProvider publishableKey={clerkKey}>
        <BrowserRouter>
          <Toaster position="top-center" />
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </HelmetProvider>
  </React.StrictMode>
);
