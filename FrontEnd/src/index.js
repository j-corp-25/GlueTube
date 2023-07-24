import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import { Provider } from "react-redux";
import App from "./components/App";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);