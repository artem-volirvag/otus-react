import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Settings from './Settings';

const settingsInitial = {
  boardFillPercent: 50,
  boardSize: { x: 10, y: 20 },
  speed: 1,
};

describe('Settings', () => {
  test('render', async () => {
    render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'stop'}
      />
    );
    const inputBoardSizeX = screen.getByTestId('inputBoardSizeX');
    expect(inputBoardSizeX).toBeInTheDocument();
    expect(inputBoardSizeX).toHaveDisplayValue(
      `${settingsInitial.boardSize.x}`
    );
    const inputBoardSizeY = screen.getByTestId('inputBoardSizeY');
    expect(inputBoardSizeY).toBeInTheDocument();
    expect(inputBoardSizeY).toHaveDisplayValue(
      `${settingsInitial.boardSize.y}`
    );
    const inputSpeed = screen.getByTestId('inputSpeed');
    expect(inputSpeed).toBeInTheDocument();
    expect(inputSpeed).toHaveDisplayValue(`${settingsInitial.speed}`);
    const inputBoardFillPercent = screen.getByTestId('inputBoardFillPercent');
    expect(inputBoardFillPercent).toBeInTheDocument();
    expect(inputBoardFillPercent).toHaveDisplayValue(
      `${settingsInitial.boardFillPercent}`
    );
    expect(screen.getByTestId('s-btn-ok')).toBeInTheDocument();
    expect(screen.getByTestId('s-btn-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('s-btn-reStart')).toBeInTheDocument();
    expect(screen.queryByTestId('s-btn-pause')).not.toBeInTheDocument();
    expect(screen.getByTestId('s-btn-start')).toBeInTheDocument();
    expect(screen.getByTestId('s-btn-clear')).toBeInTheDocument();
  });

  test('input settings', async () => {
    const onChangeSettings = jest.fn();
    render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={onChangeSettings}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'stop'}
      />
    );
    const inputBoardSizeX = screen.getByTestId('inputBoardSizeX');
    fireEvent.change(inputBoardSizeX, {
      target: { value: 30 },
    });
    const inputBoardSizeY = screen.getByTestId('inputBoardSizeY');
    fireEvent.change(inputBoardSizeY, {
      target: { value: 40 },
    });
    const inputSpeed = screen.getByTestId('inputSpeed');
    fireEvent.change(inputSpeed, {
      target: { value: 2 },
    });
    const inputBoardFillPercent = screen.getByTestId('inputBoardFillPercent');
    fireEvent.change(inputBoardFillPercent, {
      target: { value: 25 },
    });
    fireEvent.click(screen.getByTestId('s-btn-ok'));
    expect(screen.getByTestId('s-btn-ok')).toBeInTheDocument();
    expect(onChangeSettings).toHaveBeenCalledTimes(1);
    expect(onChangeSettings).toHaveBeenCalledWith({
      boardFillPercent: 25,
      speed: 2,
      boardSize: {
        x: 30,
        y: 40,
      },
    });
  });

  test('pause', async () => {
    render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'pause'}
      />
    );
    expect(screen.queryByTestId('s-btn-pause')).not.toBeInTheDocument();
    expect(screen.getByTestId('s-btn-start')).toBeInTheDocument();
  });

  test('disabled buttons ok', async () => {
    const onChangeSettings = jest.fn();
    render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={onChangeSettings}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'pause'}
      />
    );
    fireEvent.click(screen.getByTestId('s-btn-ok'));
    expect(onChangeSettings).toHaveBeenCalledTimes(0);
  });

  test('buttons', async () => {
    const onClear = jest.fn();
    const onPause = jest.fn();
    const onReStart = jest.fn();
    const onStart = jest.fn();
    const onChangeSettings = jest.fn();
    render(
      <Settings
        onClear={onClear}
        onPause={onPause}
        onChangeSettings={onChangeSettings}
        onReStart={onReStart}
        onStart={onStart}
        settings={settingsInitial}
        status={'play'}
      />
    );
    fireEvent.click(screen.getByTestId('s-btn-clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('s-btn-reStart'));
    expect(onReStart).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('s-btn-pause'));
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  test('button cancel should reset changes', async () => {
    render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'pause'}
      />
    );
    const inputBoardSizeX = screen.getByTestId('inputBoardSizeX');
    expect(inputBoardSizeX).toHaveDisplayValue('10');
    fireEvent.change(inputBoardSizeX, {
      target: { value: 30 },
    });
    fireEvent.click(screen.getByTestId('s-btn-cancel'));
    expect(inputBoardSizeX).toHaveDisplayValue('10');
  });

  test('snapshot Settings', () => {
    const { container } = render(
      <Settings
        onClear={() => null}
        onPause={() => null}
        onChangeSettings={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={settingsInitial}
        status={'pause'}
      />
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-1d87e53"
          role="toolbar"
        >
          <div>
            <label
              for="boardSizeX"
            >
              Ширина поля
            </label>
            <div
              class="css-10t62ag"
            >
              <input
                data-testid="inputBoardSizeX"
                id="boardSizeX"
                max="80"
                min="10"
                type="range"
                value="10"
              />
              <span>
                10
              </span>
            </div>
            <label
              for="boardSizeY"
            >
              Высота поля
            </label>
            <div
              class="css-10t62ag"
            >
              <input
                data-testid="inputBoardSizeY"
                id="boardSizeY"
                max="80"
                min="10"
                type="range"
                value="20"
              />
              <span>
                20
              </span>
            </div>
            <label
              for="speed"
            >
              Скорость
            </label>
            <div
              class="css-10t62ag"
            >
              <input
                data-testid="inputSpeed"
                id="speed"
                max="4"
                min="1"
                type="range"
                value="1"
              />
              <span>
                1
              </span>
            </div>
          </div>
          <div
            class="css-13r8s1v"
          >
            <button
              class="css-l5r2k1"
              data-testid="s-btn-ok"
              disabled=""
              type="button"
            >
              Применить
            </button>
            <button
              class="css-l5r2k1"
              data-testid="s-btn-cancel"
              disabled=""
              type="button"
            >
              Отменить
            </button>
          </div>
          <label
            for="inputBoardFillPercent"
          >
            Начальный процент заполнения
          </label>
          <div
            class="css-10t62ag"
          >
            <input
              data-testid="inputBoardFillPercent"
              id="inputBoardFillPercent"
              max="99"
              min="0"
              type="range"
              value="50"
            />
            <span>
              50
            </span>
          </div>
          <button
            class="css-l5r2k1"
            data-testid="s-btn-reStart"
            type="button"
          >
            Начать заново
          </button>
          <button
            class="css-l5r2k1"
            data-testid="s-btn-clear"
            type="button"
          >
            Очистить
          </button>
          <button
            class="css-1965y3k"
            data-testid="s-btn-start"
            mode="primary"
            type="button"
          >
            Возобновить
          </button>
        </div>
      </div>
    `);
  });
});
