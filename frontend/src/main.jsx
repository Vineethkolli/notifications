import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Disable StrictMode for production if necessary
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
