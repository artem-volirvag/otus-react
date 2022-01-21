import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../state/store';
import FormLogin from './FormLogin';
import { userSlice } from '../state/userSlice';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { loadLogin } from '../localStorage';

describe('FormLogin', () => {
  test('render', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </HashRouter>
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Старт' })).toBeInTheDocument();
  });

  test('input Login', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </HashRouter>
      </Provider>
    );
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    expect(screen.queryByDisplayValue('Имя')).toBeInTheDocument();
  });

  test('input Login and submit', async () => {
    jest.spyOn(userSlice.actions, 'login');
    render(
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </HashRouter>
      </Provider>
    );
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    await userEvent.click(screen.getByRole('button', { name: 'Старт' }));
    expect(loadLogin()).toBe('Имя');
  });
});
