import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('render', () => {
    render(<App />);
    expect(screen.queryByRole('heading')).toBeInTheDocument();
    expect(screen.queryByRole('toolbar')).toBeInTheDocument();
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByText('Game of life')).toBeInTheDocument();
  });
});
