import * as History from 'history';
import React from 'react';
import { BrowserRouter, Route as RouteLib, RouteProps, Switch } from 'react-router-dom';

export interface LocationPath {
    path?:
        | History.LocationDescriptor
        | ((location: History.Location) => History.LocationDescriptor);
}

export const Route: React.FC<RouteProps> = ({ children, component, ...restProps }) => {
    const Component = component as any;

    return (
        <RouteLib
            {...restProps}
            render={({ location, ...props }) => <Component location={location} {...props} />}
        />
    );
};

export const Router: React.FC = ({ children }) => (
    <BrowserRouter>
        <Switch>{children}</Switch>
    </BrowserRouter>
);
