import React from 'react';
import ReactDOM from 'react-dom';
import App from './gol/App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import FormLogin from './gol/components/FormLogin';
import { ROUTE } from './gol/constants';
import { Provider } from 'react-redux';
import store from './gol/state/store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path={ROUTE.ROOT} element={<App />} />
        <Route path={ROUTE.LOGIN} element={<FormLogin />} />
      </Routes>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
