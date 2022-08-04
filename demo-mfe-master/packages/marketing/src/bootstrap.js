import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  /**
   * Creating memory history object in bootstrap because of syncing logic with container Browser history
   * if we are running our marketing application in isolation we use defaultHistory (aka. createBrowserHistory as in container app) 
   */
  const history = defaultHistory ?? createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  // some number of fN that are container project can call to have some line of communication from container down to marketing app
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

/**
 * If we are in development and in isolation,
 * call mount immediately
 */
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    // if we are running our marketing application in isolation, in development,
    // we should make use of a browser history object instead of memory history that would allow us to have
    mount(devRoot, { defaultHistory: createBrowserHistory });
  }
}

/** We are running through container
 * and we should export the mount function
 */

export { mount };
