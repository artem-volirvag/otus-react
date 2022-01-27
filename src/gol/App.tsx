import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './components/Board';
import Settings from './components/Settings';
import { FlexBox } from './elements/FlexBox';
import { useLogin } from './useLogin';
import { selectState } from './state/store';
import {
  setSettings,
  reStart,
  start,
  clear,
  pause,
  toggleCell,
} from './state/appSlice';
import { logout } from './state/userSlice';
import { GameSettings } from './types';
import { Header } from './elements/Header';
import { Button } from './elements/Button';

function App() {
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  const { isLogined } = useLogin();

  const onCellClick = useCallback(
    (coord) => dispatch(toggleCell(coord)),
    [dispatch]
  );

  const onChangeSettings = (settings: GameSettings) =>
    dispatch(setSettings(settings));
  const onReStart = (settings: GameSettings) => dispatch(reStart(settings));
  const onStart = () => dispatch(start());
  const onClear = () => dispatch(clear());
  const onPause = () => dispatch(pause());
  const onLogout = () => dispatch(logout());

  if (!isLogined) return null;

  return (
    <>
      <Header>Игра «Жизнь»</Header>
      <FlexBox justifyContent={'center'} gap={'1rem'}>
        <FlexBox flexDirection={'vertical'}>
          <div>
            Здравствуйте, <strong>{state.user.name}</strong>
          </div>
          <Button type="button" onClick={onLogout}>
            Выход
          </Button>
          <Settings
            settings={state.app.settings}
            status={state.app.status}
            onChangeSettings={onChangeSettings}
            onReStart={onReStart}
            onStart={onStart}
            onClear={onClear}
            onPause={onPause}
          />
        </FlexBox>
        <div>
          <Board cellsData={state.app.cellsData} onCellClick={onCellClick} />
        </div>
      </FlexBox>
    </>
  );
}

export default App;
