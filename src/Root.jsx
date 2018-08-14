import React from 'react';

export const Scripts = ({ scripts }) =>
  scripts.map(script => <script key={`script-${script}`} src={script} defer />);

export const Root = ({ html }) => (
  <div id="__uni__" dangerouslySetInnerHTML={{ __html: html }} />
);
