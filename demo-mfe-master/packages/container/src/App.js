import React from "react";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

/**
 * Generic integration is priority number one, we dont want to use framework features while importing others sub projects
 * Handling css in microfrotend app need more scoping solutions
 */

const generateClassname = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    /** Container use Browser History - browser history object 
     *  BrowserRouter create Browser history object
    */
    
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassname}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
