import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './gol/App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './gol/components/FormLogin';
import { ROUTE } from './gol/constants';

describe('Index', () => {
  test('render App component', () => {
    global.Storage.prototype.getItem = jest.fn(() => 'test user');
    global.Storage.prototype.setItem = jest.fn();
    render(
      <HashRouter>
        <Routes>
          <Route path={ROUTE.ROOT} element={<App />} />
          <Route path={ROUTE.LOGIN} element={<FormLogin />} />
        </Routes>
      </HashRouter>
    );
    expect(screen.queryByRole('toolbar')).toBeInTheDocument();
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByText('test user')).toBeInTheDocument();
  });

  test('render FormLogin component', () => {
    global.Storage.prototype.getItem = jest.fn(() => null);
    global.Storage.prototype.setItem = jest.fn();
    render(
      <HashRouter>
        <Routes>
          <Route path={ROUTE.ROOT} element={<App />} />
          <Route path={ROUTE.LOGIN} element={<FormLogin />} />
        </Routes>
      </HashRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Старт' })).toBeInTheDocument();
  });
});
