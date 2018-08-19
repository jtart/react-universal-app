import loadInitialProps from './loadInitialProps';

describe('loadInitialProps', () => {
  describe('no getInitialProps function on route', () => {
    it('should return an empty object', async () => {
      const initialProps = await loadInitialProps({}, {});

      expect(initialProps).toEqual({});
    });
  });

  describe('getInitialProps function on route', () => {
    it('should call getInitialProps with passed ctx and return value', async () => {
      const route = {
        getInitialProps: jest
          .fn()
          .mockImplementation(() => Promise.resolve('Some data!')),
      };

      const initialProps = await loadInitialProps(route, {});

      expect(route.getInitialProps).toHaveBeenCalledTimes(1);
      expect(initialProps).toEqual('Some data!');
    });

    describe('error on getInitialProps call', () => {
      it('should return error', async () => {
        const route = {
          getInitialProps: jest
            .fn()
            .mockImplementation(() => Promise.reject('Error!')),
        };

        const initialProps = await loadInitialProps(route, {});

        expect(route.getInitialProps).toHaveBeenCalledTimes(1);
        expect(initialProps).toEqual('Error!');
      });
    });
  });
});
