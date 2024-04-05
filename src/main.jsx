import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App";
import { ProfileImageProvider } from "./context/ProfileImageContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ProfileImageProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProfileImageProvider>
);
