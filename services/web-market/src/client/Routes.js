import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
