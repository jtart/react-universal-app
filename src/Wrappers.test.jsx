import React from 'react';
import { ClientUni, ServerUni } from './Wrappers';

describe('ClientUni', () => {
  it('should render as exepcted', () => {
    const wrapper = shallow(
      <ClientUni data="someData!" routes={['someRoute']} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('ServerUni', () => {
  describe('no passed routerContext', () => {
    it('should render as exepcted', () => {
      const wrapper = shallow(
        <ServerUni
          location="someUrl"
          routes={['someRoute']}
          data="somePassedData"
          context={{}}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render as exepcted', () => {
    const wrapper = shallow(
      <ServerUni
        location="someUrl"
        routes={['someRoute']}
        data="somePassedData"
        context={{ context: 'someRouterContext' }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
