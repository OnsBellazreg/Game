import React from "react";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";
import { socket, SocketContext } from "./app/socket";

const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </Provider>
);