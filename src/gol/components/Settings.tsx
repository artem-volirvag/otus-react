import React, { useState } from 'react';
import { FlexBox } from '../elements/FlexBox';
import InputRange from '../elements/InputRange';
import { GameSettings, GameStatus } from '../types';

interface SettingsProps {
  settings: GameSettings;
  status: GameStatus;
  onChangeSettings: (settings: GameSettings) => void;
  onReStart: (settings: GameSettings) => void;
  onStart: () => void;
  onPause: () => void;
  onClear: () => void;
}

function Settings(props: SettingsProps) {
  const {
    settings,
    onChangeSettings,
    onClear,
    onPause,
    onStart,
    onReStart,
    status,
  } = props;
  const { boardSize, boardFillPercent, speed } = settings;

  const [boardSizeX, setBoardSizeX] = useState<number>(boardSize.x);
  const [boardSizeY, setBoardSizeY] = useState<number>(boardSize.y);
  const [gameSpeed, setGameSpeed] = useState(speed);
  const [boardFill, setBoardFill] = useState<number>(boardFillPercent);

  const getNewSettings = () => {
    return {
      boardFillPercent: boardFill,
      speed: gameSpeed,
      boardSize: {
        x: boardSizeX,
        y: boardSizeY,
      },
    };
  };

  const save = () => {
    onChangeSettings(getNewSettings());
  };

  const cancel = () => {
    setBoardSizeX(boardSize.x);
    setBoardSizeY(boardSize.y);
  };

  const reRun = () => {
    onReStart(getNewSettings());
  };

  return (
    <FlexBox flexDirection={'vertical'} role="toolbar">
      <div>
        <label htmlFor="boardSizeX">Ширина поля</label>
        <InputRange
          id="boardSizeX"
          data-testid="inputBoardSizeX"
          value={boardSizeX}
          min={3}
          max={100}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoardSizeX(parseInt(e.target.value, 10))
          }
        />
        <label htmlFor="boardSizeY">Высота поля</label>
        <InputRange
          id="boardSizeY"
          data-testid="inputBoardSizeY"
          value={boardSizeY}
          min={3}
          max={100}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoardSizeY(parseInt(e.target.value, 10))
          }
        />
        <label htmlFor="speed">Скорость</label>
        <InputRange
          id="speed"
          data-testid="inputSpeed"
          value={gameSpeed}
          min={0}
          max={3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGameSpeed(parseInt(e.target.value, 10))
          }
        />
      </div>
      <FlexBox flexDirection={'horisontal'}>
        <button type="button" onClick={save} data-testid="s-btn-ok">
          Применить
        </button>
        <button type="button" onClick={cancel} data-testid="s-btn-cancel">
          Отменить
        </button>
      </FlexBox>
      <label htmlFor="inputBoardFillPercent">
        Начальный процент заполнения
      </label>
      <InputRange
        id="inputBoardFillPercent"
        data-testid="inputBoardFillPercent"
        value={boardFill}
        max={99}
        min={0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBoardFill(parseInt(e.target.value, 10))
        }
      />
      <button type="button" onClick={reRun} data-testid="s-btn-reStart">
        Начать заново
      </button>
      {status === 'play' ? (
        <button type="button" onClick={onPause} data-testid="s-btn-pause">
          Пауза
        </button>
      ) : (
        <button type="button" onClick={onStart} data-testid="s-btn-start">
          {status === 'pause' ? 'Возобновить' : 'Старт'}
        </button>
      )}
      <button type="button" onClick={onClear} data-testid="s-btn-clear">
        Очистить
      </button>
    </FlexBox>
  );
}

export default Settings;
