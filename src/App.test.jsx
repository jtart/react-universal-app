import React from 'react';
import { App } from './App';
import * as reactRouterConfig from 'react-router-config';

describe('App', () => {
  it('should return rendered routes with initial data', () => {
    const data = 'Some initial data';

    reactRouterConfig.renderRoutes = jest.fn().mockReturnValue(<h1>{data}</h1>);

    const wrapper = shallow(<App routes={[]} initialData={{ data }} />);

    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith([], {
      data,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
