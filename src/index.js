import React from "react";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"; // Import the Router component
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
