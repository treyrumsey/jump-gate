import React from "react";

import { ColorModeScript, createLocalStorageManager } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { theme } from "theme";

import App from "~/App";
import "index.scss";

import reportWebVitals from "./reportWebVitals";

createLocalStorageManager("my-key");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <>
    <ColorModeScript
      storageKey="my-key"
      initialColorMode={theme.config.initialColorMode}
    />
    <App />
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
