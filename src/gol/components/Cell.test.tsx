import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Cell from './Cell';
import { cellStateAlive } from '../constants';

describe('Cell', () => {
  test('click Cell', () => {
    const onClick = jest.fn();
    const x = 1;
    const y = 2;
    render(<Cell cellState={cellStateAlive} onClick={onClick} x={x} y={y} />);
    userEvent.click(screen.getByTestId(`${y}-${x}`));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith({ x, y });
  });
});
