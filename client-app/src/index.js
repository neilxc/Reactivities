import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import dateFnsLocalizer from "react-widgets-date-fns";
import "react-widgets/dist/css/react-widgets.css";
import homeStore from './app/stores/homeStore';
import activityStore from './app/stores/activityStore';
import authStore from './app/stores/authStore';
import commonStore from './app/stores/commonStore';
import modalStore from './app/stores/modalStore';

dateFnsLocalizer();

const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();

const stores = {
  homeStore,
  activityStore,
  routingStore,
  authStore,
  commonStore,
  modalStore
}

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
