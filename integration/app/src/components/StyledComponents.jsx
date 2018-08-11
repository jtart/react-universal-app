import React from 'react';
import { Link } from '../../../../';
import styled from 'styled-components';

import App from './App';

const Headline = styled.h1`
  color: violet;
`;

const StyledComponents = () => (
  <App>
    <Headline>Styled Components</Headline>
    <Link to="/">Index</Link>
  </App>
);

export default StyledComponents;
