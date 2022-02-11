import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './components/Board';
import Settings from './components/Settings';
import { FlexBox } from './elements/FlexBox';
import { useLogin } from './useLogin';
import { appActions } from './state/appSlice';
import { userActions } from './state/userSlice';
import { GameSettings } from './types';
import { Header } from './elements/Header';
import { Button } from './elements/Button';
import { selectState } from './state/selectors';

function App() {
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  const { isLogined } = useLogin();

  const onCellClick = useCallback(
    (coord) => dispatch(appActions.toggleCell(coord)),
    [dispatch]
  );

  const onChangeSettings = (settings: GameSettings) =>
    dispatch(appActions.setSettings(settings));
  const onReStart = (settings: GameSettings) =>
    dispatch(appActions.reStart(settings));
  const onStart = () => dispatch(appActions.start());
  const onClear = () => dispatch(appActions.clear());
  const onPause = () => dispatch(appActions.pause());
  const onLogout = () => dispatch(userActions.logout());

  if (!isLogined) return null;

  return (
    <>
      <Header>Игра «Жизнь»</Header>
      <FlexBox justifyContent={'center'} gap={'1rem'}>
        <FlexBox flexDirection={'vertical'}>
          <div>
            Здравствуйте, <strong>{state.user.name}</strong>
          </div>
          <Button type="button" onClick={onLogout} data-testid="u-btn-logout">
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
