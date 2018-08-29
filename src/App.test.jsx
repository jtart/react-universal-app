import React from 'react';
import { App } from './App';
import * as reactRouterConfig from 'react-router-config';
import * as loadInitialData from './loadInitialData';
import * as getRouteAndMatch from './getRouteAndMatch.js';

describe('App', () => {
  let wrapper;
  let setStateSpy;
  let loadInitialDataSpy;
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
    loadInitialDataSpy = spyOn(loadInitialData, 'default');
    getRouteAndMatchSpy = spyOn(getRouteAndMatch, 'default');
  });

  it('should return rendered routes', () => {
    expect.assertions(5);
    expect(getRouteAndMatchSpy).not.toHaveBeenCalled();
    expect(loadInitialDataSpy).not.toHaveBeenCalled();
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
        expect(loadInitialDataSpy).not.toHaveBeenCalled();
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
          expect(loadInitialDataSpy).not.toHaveBeenCalled();
          expect(setStateSpy).not.toHaveBeenCalled();
        });
      });

      describe('rejected loadInitialData', () => {
        it('should set state to the error', async () => {
          const error = 'Error!';

          getRouteAndMatch.default = jest
            .fn()
            .mockReturnValue({ route: 'route', match: 'match' });
          loadInitialData.default = jest
            .fn()
            .mockImplementation(() => Promise.reject(error));

          wrapper.setProps({ location: { pathname: 'pathnameThree' } });

          await loadInitialData.default;

          expect.assertions(3);

          // why is state being called 3 times?
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            data: null,
            error: null,
            loadInitialDataPromise: expect.any(Promise),
            loading: true,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            error,
            loadInitialDataPromise: null,
            loading: false,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            error,
            loadInitialDataPromise: null,
            loading: false,
          });
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
          loadInitialData.default = jest
            .fn()
            .mockImplementation(async () => data);

          wrapper.setProps({ location: { pathname } });

          await loadInitialData.default;

          expect.assertions(4);

          expect(loadInitialData.default).toHaveBeenCalledWith(route, {
            match,
          });

          // why is state being called 3 times?
          expect(setStateSpy).toHaveBeenNthCalledWith(4, {
            data: null,
            error: null,
            loadInitialDataPromise: expect.any(Promise),
            loading: true,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(5, {
            data,
            error: null,
            loadInitialDataPromise: null,
            loading: false,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(6, {
            data,
            error: null,
            loadInitialDataPromise: null,
            loading: false,
          });
        });
      });
    });
  });
});
