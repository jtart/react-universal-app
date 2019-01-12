const serialise = data => JSON.stringify(data).replace(/</g, '\\u003c');

const Document = (helmet, app, data, scripts, styles) => {
  const serialisedData = serialise(data);

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
        <div id="root">${app}</div>
        <script>window.__APP_DATA__ = ${serialisedData}</script>
        ${scripts
          .map(script => `<script src="${script}" defer></script>`)
          .join('')}
      </body>
    </html>
  `;
};

export default Document;
