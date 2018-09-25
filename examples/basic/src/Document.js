const Document = (app, data, scripts) => {
  const serialisedData = JSON.stringify(data).replace(/</g, '\\u003c');

  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
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
