import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
//** In all scenarios we wanted to container show themselves imediaetly. */
//** Only our sub project need check for production or development for export valid mount function like @see marketing/src/bootstrap */
ReactDOM.render(<App />, document.querySelector("#root"));
