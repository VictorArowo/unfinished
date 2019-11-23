import React, { Component } from 'react';
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error('Component is undefined');
  }

  const Component = component;

  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (localStorage.getItem('accessToken')) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
