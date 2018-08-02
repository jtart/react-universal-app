import Index from './components/Index';

const indexGetInitialProps = () => ({
  data: 'Index',
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
    getInitialProps: () => ({ data: 'Home', to: '/', text: 'Index' }),
  },
];

export default routes;
