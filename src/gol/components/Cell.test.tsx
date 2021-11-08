import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Cell from './Cell';

describe('Cell', () => {
  test('click Cell', () => {
    const cellNum = 10;
    const { container } = render(<Cell cellState={1} num={cellNum} />);
    const cell = container.firstChild;
    expect(cell).not.toBeNull();
    if (!cell) return;

    fireEvent.click(cell);
    expect(screen.queryByText(`${cellNum}`)).toBeInTheDocument();

    fireEvent.click(cell);
    expect(screen.queryByText(`${cellNum}`)).not.toBeInTheDocument();
  });
});
