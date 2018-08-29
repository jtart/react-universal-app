import Index from './components/Index';
import StyledComponents from './components/StyledComponents';
import Apollo from './components/Apollo';

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    getInitialData: async () => ({
      title: 'Index',
      link: {
        to: '/styledComponents',
        text: 'StyledComponents',
      },
    }),
  },
  {
    path: '/styledComponents',
    component: StyledComponents,
    getInitialData: async () => ({ link: { to: '/', text: 'Home' } }),
  },
  {
    path: '/apollo',
    component: Apollo,
  },
];

export default routes;
