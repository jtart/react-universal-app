import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import hydrateClient from './hydrateClient';

reactDom.hydrate = jest.fn();

const mockSpan = document.createElement('span');
global.window.document.getElementById = jest.fn().mockReturnValue(mockSpan);
global.window.__UNI_DATA__ = { data: 'Data!' };

describe('hydrateClient', () => {
  describe('with no passed wrapper', () => {
    it('should pass a BrowserRouter and App, wrapped in the default wrapper, to hydrate', () => {
      hydrateClient(['routes']);

      expect(reactDom.hydrate).toHaveBeenCalledWith(
        <HelmetProvider context={{}}>
          <BrowserRouter>
            <App routes={['routes']} initialData={global.window.__UNI_DATA__} />
          </BrowserRouter>
        </HelmetProvider>,
        mockSpan,
      );
    });
  });

  describe('with a wrapper', () => {
    it('should pass a BrowserRouter and App, wrapped in a wrapper, to hydrate', () => {
      const withWrapper = ({ children }) => <div>{children}</div>;
      hydrateClient([], withWrapper);

      expect(reactDom.hydrate).toHaveBeenCalledWith(
        withWrapper(
          <BrowserRouter>
            <App routes={[]} initialData={{}} />
          </BrowserRouter>,
        ),
        mockSpan,
      );
    });
  });
});
