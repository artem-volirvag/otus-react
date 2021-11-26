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
    expect(inputBoardSizeX).toHaveDisplayValue('10');
    const inputBoardSizeY = screen.getByTestId('inputBoardSizeY');
    expect(inputBoardSizeY).toBeInTheDocument();
    expect(inputBoardSizeY).toHaveDisplayValue('20');
    const inputSpeed = screen.getByTestId('inputSpeed');
    expect(inputSpeed).toBeInTheDocument();
    expect(inputSpeed).toHaveDisplayValue('1');
    const inputBoardFillPercent = screen.getByTestId('inputBoardFillPercent');
    expect(inputBoardFillPercent).toBeInTheDocument();
    expect(inputBoardFillPercent).toHaveDisplayValue('50');
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
    fireEvent.click(screen.getByTestId('s-btn-ok'));
    expect(onChangeSettings).toHaveBeenCalledTimes(1);
  });
});
