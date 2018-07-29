import React from 'react';
import { Link } from 'react-router-dom';

export default ({ to, children }) => <Link to={to}>{children}</Link>;
