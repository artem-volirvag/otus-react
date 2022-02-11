import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../state/store';
import FormLogin from './FormLogin';
import { userActions } from '../state/userSlice';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { loadLogin } from '../localStorage';

describe('FormLogin', () => {
  test('should input Login and submit', async () => {
    jest.spyOn(userActions, 'login');
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
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    expect(screen.queryByDisplayValue('Имя')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Старт' }));
    expect(userActions.login).toBeCalled();
    expect(loadLogin()).toBe('Имя');
  });

  test('snapshot FormLogin', () => {
    const { container } = render(
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </HashRouter>
      </Provider>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-13r8s1v"
        >
          <div
            class="css-nhm8x0"
            width="200px"
          >
            <input
              class="css-15axbp4"
              id="login"
              placeholder="Введите ваше имя"
              type="text"
              value=""
            />
            <button
              class="css-1965y3k"
              mode="primary"
              type="button"
            >
              Старт
            </button>
          </div>
        </div>
      </div>
    `);
  });
});
