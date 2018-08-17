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
      {title ? <title>{title}</title> : null}
    </Helmet>
    <h1>{title ? title : 'Loading...'}</h1>
    <Link to={link.to}>{link.text} page</Link>
  </div>
);

export default Index;
