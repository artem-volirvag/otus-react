import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './gol/App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './gol/components/FormLogin';
import { ROUTE } from './gol/constants';
import { Provider } from 'react-redux';
import store from './gol/state/store';

jest.mock('./gol/localStorage', () => ({
  loadLogin: jest.fn(() => 'init login'),
}));

describe('Index', () => {
  test('render App component', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path={ROUTE.ROOT} element={<App />} />
            <Route path={ROUTE.LOGIN} element={<FormLogin />} />
          </Routes>
        </HashRouter>
      </Provider>
    );
    expect(screen.queryByRole('toolbar')).toBeInTheDocument();
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByText('init login')).toBeInTheDocument();
  });
});
