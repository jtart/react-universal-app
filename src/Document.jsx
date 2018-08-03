import React from 'react';
import { ServerData, Scripts, Root } from './Root.jsx';

const Document = ({ assets, html, data, helmet, styles }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styles}
      </head>
      <body {...bodyAttrs}>
        <Root html={html} />
        <ServerData data={data} />
        <Scripts assets={assets} />
      </body>
    </html>
  );
};

export default Document;
