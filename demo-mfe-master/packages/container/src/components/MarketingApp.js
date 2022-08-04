import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        // Callback fN automaticly occurs on every navigation attempt in marketing /
        // Need for history object communication within microfrontends /
        // To avoid infinite loop we need check pathname /
        // console.log("Container noticed navigation in Marketing");
        const { pathname } = history.location;
        // check if the current and next pathname are diffrenet
        // to avoid infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
