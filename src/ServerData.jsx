import React from 'react';

export const fetchData = id =>
  JSON.parse(window.document.getElementById(id).textContent);

const ServerData = ({ id, data }) => {
  const serialisedProps = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: serialisedProps,
      }}
    />
  );
};

export default ServerData;
