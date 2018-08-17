import React from 'react';
import Document from './Document';
import Helmet from 'react-helmet';

Helmet.renderStatic = jest.fn().mockReturnValue({
  htmlAttributes: {
    toComponent: jest.fn().mockReturnValue({ lang: 'en_GB' }),
  },
  title: {
    toComponent: jest.fn().mockReturnValue(<title />),
  },
  meta: {
    toComponent: jest.fn().mockReturnValue(<meta />),
  },
  link: {
    toComponent: jest
      .fn()
      .mockReturnValue([<link key="l-1" />, <link key="l-2" />]),
  },
  bodyAttributes: {
    toComponent: jest.fn().mockReturnValue({ dir: 'ltr' }),
  },
});

describe('Document', () => {
  it('should render correctly', () => {
    const doc = (
      <Document
        additionalHeadProps={[
          <style key="s-1" data-test-styles-one />,
          <style key="s-2" data-test-styles-two />,
        ]}
        appHTML={<h1>This is some html</h1>}
        data={{ data: 'This is some data!' }}
        scripts={['https://example.com/one.js', 'https://example.com/two.js']}
      />
    );
    const wrapper = shallow(doc);
    expect(wrapper).toMatchSnapshot();
  });
});
