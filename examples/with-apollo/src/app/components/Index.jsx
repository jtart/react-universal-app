import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@jtart/uni';

const Index = ({ title, link }) => (
  <div>
    <Helmet>{title ? <title>{title}</title> : null}</Helmet>
    <h1>{title ? title : 'Loading...'}</h1>
    {link ? <Link to={link.to}>{link.text} page</Link> : null}
  </div>
);

export default Index;
