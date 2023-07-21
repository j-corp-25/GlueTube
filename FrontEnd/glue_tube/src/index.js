import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import { Provider } from "react-redux";
import App from "./components/App";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";
import { restoreSession } from './store/csrf';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

function initialyzeApp() {

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

restoreSession().then(initialyzeApp);
