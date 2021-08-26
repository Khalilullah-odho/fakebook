import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/auth";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
