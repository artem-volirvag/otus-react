import React from 'react';
import ReactDOM from 'react-dom';
import App from './gol/App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import FormLogin from './gol/components/FormLogin';
import { ROUTE } from './gol/constants';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path={ROUTE.ROOT} element={<App />} />
      <Route path={ROUTE.LOGIN} element={<FormLogin />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
