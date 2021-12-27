import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormLogin from './FormLogin';

const mockOnLogin = jest.fn();
jest.mock('../useLogin', () => ({
  useLogin: jest.fn(() => ({
    onLogin: mockOnLogin,
  })),
}));

describe('FormLogin', () => {
  test('render', async () => {
    render(<FormLogin />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Старт' })).toBeInTheDocument();
  });

  test('input Login', async () => {
    render(<FormLogin />);
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    expect(screen.queryByDisplayValue('Имя')).toBeInTheDocument();
  });

  test('input Login and submit', async () => {
    render(<FormLogin />);
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    await userEvent.click(screen.getByRole('button'));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('Имя');
  });
});
