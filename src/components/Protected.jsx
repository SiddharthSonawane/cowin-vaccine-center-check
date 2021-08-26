import React from "react";
import { Route, Redirect } from "react-router";

const Protected = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ path: "/login" }} />
        )
      }
    ></Route>
  );
};

export default Protected;
//<Component {...props} {...rest} />
//<Redirect to={{ path: "/login" }} />
