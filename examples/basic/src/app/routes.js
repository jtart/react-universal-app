import Index from './components/Index';
import About from './components/About';

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    getInitialData: async () => ({
      title: 'Basic app example',
      link: {
        to: '/about',
        text: 'About',
      },
    }),
  },
  {
    path: '/about',
    component: About,
  },
];

export default routes;
