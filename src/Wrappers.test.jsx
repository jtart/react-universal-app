import React from 'react';
import { ClientUni, ServerUni } from './Wrappers';

describe('ClientUni', () => {
  describe('no uni data on window', () => {
    it('should render as exepcted', () => {
      const wrapper = shallow(<ClientUni routes={['someRoute']} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render as exepcted', () => {
    window.__UNI_DATA__ = 'someData!';

    const wrapper = shallow(<ClientUni routes={['someRoute']} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('ServerUni', () => {
  describe('no passed routerContext', () => {
    it('should render as exepcted', () => {
      const wrapper = shallow(
        <ServerUni
          url="someUrl"
          routes={['someRoute']}
          data="somePassedData"
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render as exepcted', () => {
    const wrapper = shallow(
      <ServerUni
        url="someUrl"
        routes={['someRoute']}
        data="somePassedData"
        routerContext="someRouterContext"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
