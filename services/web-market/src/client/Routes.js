import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404Page';
import DetailsPage from './pages/DetailsPage';

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
        ...DetailsPage,
        path: '/details'
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
