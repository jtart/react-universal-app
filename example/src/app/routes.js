import Home from './components/Home';

const routes = [
  {
    path: '/',
    component: Home,
    getInitialData: () => 'hello!'
  },
];

export default routes;