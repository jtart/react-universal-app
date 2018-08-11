import React from 'react';
import { Scripts, Root } from './Root';

describe('Scripts', () => {
  it('should render scripts for each JS script', () => {
    const scripts = [
      'https://example.com/bundle.one.js',
      'https://example.com/bundle.two.js',
    ];

    const wrapper = shallow(<Scripts scripts={scripts} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Root', () => {
  it('should render a div with injected HTML', () => {
    const html = <div>Hello!</div>;

    const wrapper = shallow(<Root html={html} />);
    expect(wrapper).toMatchSnapshot();
  });
});
