import React from 'react';
import { App } from './App';
import * as reactRouterConfig from 'react-router-config';
import * as loadInitialProps from './loadInitialProps';
import * as getRouteAndMatch from './getRouteAndMatch.js';

describe('App', () => {
  let wrapper;
  let setStateSpy;
  let loadInitialPropsSpy;
  let getRouteAndMatchSpy;
  const initialData = { data: 'Some initial data' };

  reactRouterConfig.renderRoutes = jest
    .fn()
    .mockReturnValue(<h1>{initialData.data}</h1>);

  beforeAll(() => {
    wrapper = shallow(
      <App
        location={{ pathname: 'pathnameOne' }}
        routes={[]}
        initialData={initialData}
      />,
    );
    setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
    loadInitialPropsSpy = spyOn(loadInitialProps, 'default');
    getRouteAndMatchSpy = spyOn(getRouteAndMatch, 'default');
  });

  it('should return rendered routes', () => {
    expect.assertions(5);
    expect(getRouteAndMatchSpy).not.toHaveBeenCalled();
    expect(loadInitialPropsSpy).not.toHaveBeenCalled();
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith([], {
      data: initialData,
      error: null,
      loading: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidUpdate', () => {
    describe('same location', () => {
      it('should not call set state with new data', () => {
        wrapper.setProps({ location: { pathname: 'pathnameOne' } });

        expect.assertions(3);
        expect(getRouteAndMatchSpy).not.toHaveBeenCalled();
        expect(loadInitialPropsSpy).not.toHaveBeenCalled();
        expect(setStateSpy).not.toHaveBeenCalled();
      });
    });

    describe('different location', () => {
      describe('no route or match', () => {
        it('should only call getRouteAndMatch', () => {
          const pathname = 'pathnameTwo';

          getRouteAndMatch.default = jest.fn().mockReturnValue({});

          wrapper.setProps({ location: { pathname } });

          expect.assertions(3);
          expect(getRouteAndMatch.default).toHaveBeenCalledWith(pathname, []);
          expect(loadInitialPropsSpy).not.toHaveBeenCalled();
          expect(setStateSpy).not.toHaveBeenCalled();
        });
      });

      describe('rejected loadInitialProps', () => {
        it('should console log the error', async () => {
          const error = 'Error!';
          spyOn(global.console, 'log');

          getRouteAndMatch.default = jest
            .fn()
            .mockReturnValue({ route: 'route', match: 'match' });
          loadInitialProps.default = jest
            .fn()
            .mockImplementation(() => Promise.reject(error));

          wrapper.setProps({ location: { pathname: 'pathnameThree' } });

          await loadInitialProps.default;

          expect.assertions(2);
          expect(global.console.log).toBeCalledWith(error);
          expect(setStateSpy).not.toBeCalled();
        });
      });

      describe('successful fetch of route, match, and initial props', () => {
        it('should call set state with new data', async () => {
          const pathname = 'pathnameFour';
          const route = 'some route';
          const match = 'a match';
          const data = 'Really cool data';

          getRouteAndMatch.default = jest
            .fn()
            .mockReturnValue({ route, match });
          loadInitialProps.default = jest
            .fn()
            .mockImplementation(async () => data);

          wrapper.setProps({ location: { pathname } });

          await loadInitialProps.default;

          expect.assertions(2);
          expect(loadInitialProps.default).toHaveBeenCalledWith(route, {
            match,
          });
          expect(setStateSpy).toBeCalledWith({ data });
        });
      });
    });
  });
});
