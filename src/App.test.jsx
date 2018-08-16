import React from 'react';
import { App } from './App';
import * as reactRouterConfig from 'react-router-config';
import * as loadInitialProps from './loadInitialProps';
import * as getRouteAndMatch from './getRouteAndMatch.js';

loadInitialProps.default = jest.fn();
getRouteAndMatch.default = jest.fn();

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

  describe('componentDidUpdate', () => {
    let wrapper;
    let setStateSpy;
    beforeAll(() => {
      wrapper = shallow(
        <App
          location={{ pathname: 'pathnameOne' }}
          routes={[]}
          initialData={{ data: 'Some of it' }}
        />,
      );
      setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
    });

    describe('same location', () => {
      it('should not call set state with new data', () => {
        wrapper.setProps({ location: { pathname: 'pathnameOne' } });

        expect.assertions(3);
        expect(getRouteAndMatch.default).not.toHaveBeenCalled();
        expect(loadInitialProps.default).not.toHaveBeenCalled();
        expect(setStateSpy).not.toHaveBeenCalled();
      });
    });

    describe('different location', () => {
      describe('no route or match', () => {
        it('should not call set state with new data', () => {
          const pathname = 'pathnameTwo';
          wrapper.setProps({ location: { pathname } });

          expect.assertions(3);
          expect(getRouteAndMatch.default).toHaveBeenCalledWith(pathname, []);
          expect(loadInitialProps.default).not.toHaveBeenCalled();
          expect(setStateSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
