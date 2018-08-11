import Index from './components/Index';
import Apollo from './components/Apollo';

const indexGetInitialProps = async () => ({
  title: 'Index',
  to: '/home',
  text: 'Home',
});

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    getInitialProps: indexGetInitialProps,
  },
  {
    path: '/home',
    component: Index,
    getInitialProps: async () => ({ title: 'Home', to: '/', text: 'Index' }),
  },
  {
    path: '/param/:id',
    component: Index,
    getInitialProps: async ({ match }) => ({
      title: match.params.id,
      to: '/',
      text: 'Index',
    }),
  },
  {
    path: '/apollo',
    component: Apollo,
  },
];

export default routes;
