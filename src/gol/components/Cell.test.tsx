import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Cell from './Cell';
import { cellStateAlive, cellStateEmpty } from '../constants';

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

  test('snapshot empty (dead)', () => {
    const { container } = render(
      <Cell cellState={cellStateEmpty} onClick={jest.fn()} x={1} y={2} />
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="css-1t9tzm9"
          data-testid="2-1"
        />
      </div>
    `);
  });

  test('snapshot alive', () => {
    const { container } = render(
      <Cell cellState={cellStateAlive} onClick={jest.fn()} x={1} y={2} />
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="css-1r7ktbl"
          data-testid="2-1"
        />
      </div>
    `);
  });
});
