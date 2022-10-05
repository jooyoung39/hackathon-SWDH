import React from "react";
import ReactDOM from "react-dom/client";

import store from "./store/store";
import { Provider } from "react-redux";

import ModalsProvider from "./providers/ModalsProvider";

import Main from "./pages/main";

import "./assets/style/index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/fa-all.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalsProvider>
        <Main />
      </ModalsProvider>
    </Provider>
  </React.StrictMode>
);
