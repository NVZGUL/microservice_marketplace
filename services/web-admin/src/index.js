import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './skeleton.css';
import './normalize.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

const router = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
