const serialise = data => JSON.stringify(data).replace(/</g, '\\u003c');

const Document = (helmet, app, data, scripts, styles, apolloData) => {
  const serialisedData = serialise(data);
  const serialisedApolloData = serialise(apolloData);

  return `
    <!DOCTYPE html>
    <html>
      <head ${helmet.htmlAttributes.toString()}>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${styles}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="__uni__">${app}</div>
        <script>window.__UNI_DATA__ = ${serialisedData}</script>
        <script>window.__APOLLO_DATA__ = ${serialisedApolloData}</script>
        ${scripts
          .map(script => `<script src="${script}" defer></script>`)
          .join('')}
      </body>
    </html>
  `;
};

export default Document;
