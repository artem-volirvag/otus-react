import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CounterConainer from './CounterConainer';

describe('CounterConainer', () => {
  test('after fetch CounterConainer', async () => {
    render(<CounterConainer maxCounter={20} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(await screen.findByText('5')).toBeInTheDocument();
  });

  test('inc CounterConainer', async () => {
    render(<CounterConainer maxCounter={20} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(await screen.findByText('5')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Inc'));
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('dec CounterConainer', async () => {
    render(<CounterConainer maxCounter={20} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(await screen.findByText('5')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Dec'));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('test maxCounter CounterConainer', async () => {
    render(<CounterConainer maxCounter={6} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(await screen.findByText('5')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Inc'));
    await userEvent.click(screen.getByText('Inc'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
