import React from 'react';
import { Helmet } from 'react-helmet';

const App = ({ children }) => (
  <div>
    <Helmet>
      <title>My app!</title>
    </Helmet>
    {children}
  </div>
);

export default App;
