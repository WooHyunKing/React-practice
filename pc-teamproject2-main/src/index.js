import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = createRoot(document.getElementById("app"));
root.render(
  <RecoilRoot>
    <App tab="home" />
  </RecoilRoot>
);
