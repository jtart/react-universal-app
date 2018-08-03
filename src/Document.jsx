import React from 'react';
import { ServerData, Scripts, Root } from './Root.jsx';

const Document = ({ helmet, styles, html, data, scripts }) => {
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
        <Scripts scripts={scripts} />
      </body>
    </html>
  );
};

export default Document;
