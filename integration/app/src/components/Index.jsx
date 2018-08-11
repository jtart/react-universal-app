import React from 'react';
import { Link } from '../../../../';
import { Helmet } from 'react-helmet';

import App from './App';

const Index = ({ title, link }) => (
  <App>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <h1>{title}</h1>
    <Link to={link.to}>{link.text}</Link>
  </App>
);

export default Index;
