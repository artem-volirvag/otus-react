import React from 'react';
import { render, screen } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  test('render Counter', () => {
    const counter = 10;
    render(<Counter counter={counter} />);
    expect(screen.queryByText(`${counter}`)).toBeInTheDocument();
  });
});
