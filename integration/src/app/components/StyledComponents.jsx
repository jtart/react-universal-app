import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeadline = styled.h1`
  color: red;
`;

const StyledComponents = ({ loading, error, data }) => {
  if (loading) return 'Loading!';
  if (error) return 'Error';
  if (data) {
    return (
      <div>
        <StyledHeadline>Styled Components</StyledHeadline>
        <Link to={data.link.to}>{data.link.text}</Link>
      </div>
    );
  }
};

export default StyledComponents;
