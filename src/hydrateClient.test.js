import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import hydrateClient from './hydrateClient';

reactDom.hydrate = jest.fn();

const mockSpan = document.createElement('span');
mockSpan.textContent = '{"data":"Data!"}';
global.window.document.getElementById = jest.fn().mockReturnValue(mockSpan);

describe('hydrateClient', () => {
  describe('with no passed wrapper', () => {
    it('should pass a BrowserRouter and App, wrapped in the default wrapper, to hydrate', () => {
      hydrateClient(['routes']);

      expect(reactDom.hydrate).toHaveBeenCalledWith(
        <BrowserRouter>
          <App routes={['routes']} initialData={{ data: 'Data!' }} />
        </BrowserRouter>,
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
