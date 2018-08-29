import createDocument from './createDocument';

describe('createDocument', () => {
  it('should render correctly a string containing a HTML document', () => {
    const app = {
      appHTML: '<h1>This is some html</h1>',
      additionalHeadElements: [
        '<style key="s-1" data-test-styles-one />',
        '<style key="s-2" data-test-styles-two />',
      ],
      helmet: {
        htmlAttributes: jest.fn().mockReturnValue({ lang: 'en_GB' }),
        title: jest.fn().mockReturnValue('<title />'),
        meta: jest.fn().mockReturnValue('<meta />'),
        link: jest
          .fn()
          .mockReturnValue(['<link key="l-1" />', '<link key="l-2" />']),
        bodyAttributes: jest.fn().mockReturnValue({ dir: 'ltr' }),
      },
    };
    const data = { data: 'This is some data!' };
    const scripts = [
      'https://example.com/one.js',
      'https://example.com/two.js',
    ];
    const doc = createDocument(app, data, scripts);
    expect(doc).toMatchSnapshot();
  });
});
