import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Board from './Board';
import { CellsData } from '../types';

describe('Board', () => {
  test('render null', () => {
    const { container } = render(
      <Board cellsData={[]} onCellClick={() => null} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('render 3x4', () => {
    const cellsData: CellsData = [
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
    ];
    render(<Board cellsData={cellsData} onCellClick={() => null} />);
    expect(screen.getByTestId(`${0}-${0}`)).toBeInTheDocument();
    expect(screen.getByTestId(`${2}-${3}`)).toBeInTheDocument();
    expect(screen.queryByTestId(`${10}-${10}`)).not.toBeInTheDocument();
  });

  test('click cell', () => {
    const onCellClick = jest.fn();
    const x = 1;
    const y = 2;
    const cellsData: CellsData = [
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
    ];
    render(<Board cellsData={cellsData} onCellClick={onCellClick} />);
    userEvent.click(screen.getByTestId(`${y}-${x}`));
    expect(onCellClick).toHaveBeenCalledTimes(1);
    expect(onCellClick).toHaveBeenCalledWith({ x, y });
  });
});
