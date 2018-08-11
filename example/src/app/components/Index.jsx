import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@jtart/uni';

const Index = ({ title, link }) => (
  <div>
    <Helmet>
      <html lang="en-GB" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Page description" />
      <title>{title}</title>
    </Helmet>
    <h1>{title}</h1>
    <ul>
      <li>
        <Link to={link.to}>{link.text} page</Link>
      </li>
      <li>
        <Link to="/apollo">Apollo page</Link>
      </li>
    </ul>
  </div>
);

export default Index;
