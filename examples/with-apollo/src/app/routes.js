import Index from './components/Index';
import Apollo from './components/Apollo';

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    getInitialProps: async () => ({
      title: 'Index',
      link: {
        to: '/apollo',
        text: 'GraphQL w/ Apollo',
      },
    }),
  },
  {
    path: '/apollo',
    component: Apollo,
  },
];

export default routes;
