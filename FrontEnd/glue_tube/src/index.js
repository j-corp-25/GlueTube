import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./styles/reset.css";
import App from "./components/App";
import configureStore from "./store/index";
import { BrowserRouter } from "react-router-dom";
import csrfFetch, { restoreCSRF } from './store/csrf';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function initialyzeApp() {

}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}

// restoreSession().then(initialyzeApp);
