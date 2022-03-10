import React, { useState } from 'react';
import { Button } from '../elements/Button';
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
  const [changed, setChanged] = useState(false);
  const [changedNew, setChangedNew] = useState(false);

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
    setChanged(false);
  };

  const cancel = () => {
    setBoardSizeX(boardSize.x);
    setBoardSizeY(boardSize.y);
    setGameSpeed(speed);
    setChanged(false);
  };

  const reRun = () => {
    onReStart(getNewSettings());
    setChangedNew(false);
    setChanged(false);
  };

  const onChangeBoardSizeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSizeX(parseInt(e.target.value, 10));
    setChanged(true);
  };

  const onChangeBoardSizeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSizeY(parseInt(e.target.value, 10));
    setChanged(true);
  };

  const onChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameSpeed(parseInt(e.target.value, 10));
    setChanged(true);
  };

  const onChangeBoardFillPercent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardFill(parseInt(e.target.value, 10));
    setChangedNew(true);
  };

  return (
    <FlexBox flexDirection={'vertical'} role="toolbar">
      <div>
        <label htmlFor="boardSizeX">Ширина поля</label>
        <InputRange
          id="boardSizeX"
          data-testid="inputBoardSizeX"
          value={boardSizeX}
          min={10}
          max={80}
          onChange={onChangeBoardSizeX}
        />
        <label htmlFor="boardSizeY">Высота поля</label>
        <InputRange
          id="boardSizeY"
          data-testid="inputBoardSizeY"
          value={boardSizeY}
          min={10}
          max={80}
          onChange={onChangeBoardSizeY}
        />
        <label htmlFor="speed">Скорость</label>
        <InputRange
          id="speed"
          data-testid="inputSpeed"
          value={gameSpeed}
          min={1}
          max={4}
          onChange={onChangeSpeed}
        />
      </div>
      <FlexBox flexDirection={'horisontal'} justifyContent={'center'}>
        <Button
          type="button"
          onClick={save}
          data-testid="s-btn-ok"
          mode={changed ? 'primary' : undefined}
          disabled={!changed}
        >
          Применить
        </Button>
        <Button
          type="button"
          onClick={cancel}
          data-testid="s-btn-cancel"
          disabled={!changed}
        >
          Отменить
        </Button>
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
        onChange={onChangeBoardFillPercent}
      />
      <Button
        type="button"
        onClick={reRun}
        data-testid="s-btn-reStart"
        mode={changedNew ? 'primary' : undefined}
      >
        Начать заново
      </Button>
      <Button type="button" onClick={onClear} data-testid="s-btn-clear">
        Очистить
      </Button>
      {status === 'play' ? (
        <Button
          type="button"
          onClick={onPause}
          data-testid="s-btn-pause"
          mode="secondary"
        >
          Пауза
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onStart}
          data-testid="s-btn-start"
          mode="primary"
        >
          {status === 'pause' ? 'Возобновить' : 'Старт'}
        </Button>
      )}
    </FlexBox>
  );
}

export default Settings;
