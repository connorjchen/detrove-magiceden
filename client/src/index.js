import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./redux/reducers";
import App from "./App";
import WalletAdapter from "./WalletAdapter2";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <WalletAdapter />
  </Provider>
);
