import React from 'react';
import Link from './Link';

describe('Link', () => {
  it('should render a React Router link', () => {
    const wrapper = shallow(<Link to="/test">Test!</Link>);
    expect(wrapper).toMatchSnapshot();
  });
});
