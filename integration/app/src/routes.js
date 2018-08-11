import Index from './components/Index';
import StyledComponent from './components/StyledComponent';
import Apollo from './components/Apollo';

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    getInitialProps: async () => ({
      title: 'Index',
      link: { to: '/styledComponents', text: 'StyledComponents' },
    }),
  },
  {
    path: '/styledComponents',
    exact: true,
    component: StyledComponent,
  },
  {
    path: '/apollo',
    component: Apollo,
  },
];

export default routes;
