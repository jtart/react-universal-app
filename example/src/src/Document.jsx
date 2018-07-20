import React from 'react';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const scripts = Object.keys(assets).map(key => (
  <script key={key} src={`${assets[key].js}`} defer />
));

const Document = ({ content }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      {/* {scripts} */}
    </body>
  </html>
);

export default Document;
