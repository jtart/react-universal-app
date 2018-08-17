import React from 'react';
import { Helmet } from 'react-helmet';

const Index = () => (
  <div>
    <Helmet>
      <html lang="en-GB" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Page description" />
      <title>About</title>
    </Helmet>
    <h1>About</h1>
    <p>This is a page that doesn't inject any initial props on the route.</p>
  </div>
);

export default Index;
