import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeadline = styled.h1`
  color: red;
`;

const StyledComponents = ({ link }) => (
  <div>
    <StyledHeadline>Styled Components</StyledHeadline>
    <Link to={link.to}>{link.text}</Link>
  </div>
);

export default StyledComponents;
