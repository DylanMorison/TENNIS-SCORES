import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export type RequireAuthProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

const RequireAuth: React.ElementType = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAppSelector((state) => state.User.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default RequireAuth;
