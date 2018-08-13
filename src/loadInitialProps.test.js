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
      const returnedValue = 'Some data!';

      const route = {
        getInitialProps: jest.fn().mockImplementation(ctx => ctx),
      }

      const initialProps = await loadInitialProps(route, returnedValue);

      expect(route.getInitialProps).toHaveBeenCalledTimes(1);
      expect(initialProps).toEqual(returnedValue);
    });
  });
});
