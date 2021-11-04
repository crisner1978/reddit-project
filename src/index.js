import AppProviders from "AppProviders";
import ReactDOM from "react-dom";
import "styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "lib/date-config"


ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);

serviceWorker.unregister();
