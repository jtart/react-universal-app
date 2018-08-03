import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from '@jtart/uni';

const StyledHeadline = styled.h1`
  color: red;
`;

const Home = ({ data, to, text }) => (
  <div>
    <Helmet>
      <html lang="en-GB" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Page description" />
      <title>{title}</title>
    </Helmet>
    <StyledHeadline>{title}</StyledHeadline>
    <Link to={to}>Go... {text}</Link>
  </div>
);

export default Home;
