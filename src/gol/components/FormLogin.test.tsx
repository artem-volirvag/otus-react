import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormLogin from './FormLogin';

describe('FormLogin', () => {
  test('render', async () => {
    render(<FormLogin onSubmit={() => null} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    expect(screen.queryByDisplayValue('Имя')).toBeInTheDocument();
  });

  test('input Login', async () => {
    render(<FormLogin onSubmit={() => null} />);
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    expect(screen.queryByDisplayValue('Имя')).toBeInTheDocument();
  });

  test('input Login and submit', async () => {
    const onSubmit = jest.fn();
    render(<FormLogin onSubmit={onSubmit} />);
    expect(screen.queryByText(/Имя/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'Имя');
    await userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('Имя');
  });
});
