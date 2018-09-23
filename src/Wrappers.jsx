import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import Uni from './Uni.jsx';

export const ClientUni = props => (
  <BrowserRouter {...props}>
    <Uni initialData={props.data} routes={props.routes} />
  </BrowserRouter>
);

export const ServerUni = props => (
  <StaticRouter {...props}>
    <Uni initialData={props.data} routes={props.routes} />
  </StaticRouter>
);
