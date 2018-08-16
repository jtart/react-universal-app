import React from 'react';
import App from './App';
import * as reactRouterConfig from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

reactRouterConfig.renderRoutes = jest
  .fn()
  .mockReturnValue(<h1>A rendered route!</h1>);

describe('App', () => {
  it('should return rendered routes', () => {
    const wrapper = mount(
      <BrowserRouter>
        <App routes={[]} initialData={{ data: 'Some of it' }} />
      </BrowserRouter>,
    );

    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith([], {
      data: 'Some of it',
    });
    expect(wrapper).toMatchSnapshot();
  });
});
