import createDocument from './createDocument';
import Helmet from 'react-helmet';

Helmet.renderStatic = jest.fn().mockReturnValue({
  htmlAttributes: jest.fn().mockReturnValue({ lang: 'en_GB' }),
  title: jest.fn().mockReturnValue('<title />'),
  meta: jest.fn().mockReturnValue('<meta />'),
  link: jest.fn().mockReturnValue(['<link key="l-1" />', '<link key="l-2" />']),
  bodyAttributes: jest.fn().mockReturnValue({ dir: 'ltr' }),
});

describe('createDocument', () => {
  it('should render correctly a string containing a HTML document', () => {
    const appHTML = '<h1>This is some html</h1>';
    const data = { data: 'This is some data!' };
    const scripts = [
      'https://example.com/one.js',
      'https://example.com/two.js',
    ];
    const additionalHeadElements = [
      '<style key="s-1" data-test-styles-one />',
      '<style key="s-2" data-test-styles-two />',
    ];
    const doc = createDocument(appHTML, data, scripts, additionalHeadElements);
    expect(doc).toMatchSnapshot();
  });
});
