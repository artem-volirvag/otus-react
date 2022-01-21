import React from 'react';
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

function App() {
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  const { isLogined } = useLogin();

  if (!isLogined) return null;

  return (
    <>
      <h1>Game of life</h1>
      <FlexBox>
        <FlexBox flexDirection={'vertical'}>
          <div>
            Здравствуйте, <strong>{state.user.name}</strong>
          </div>
          <button type="button" onClick={() => dispatch(logout())}>
            Выход
          </button>
          <Settings
            settings={state.app.settings}
            status={state.app.status}
            onChangeSettings={(settings) => dispatch(setSettings(settings))}
            onReStart={(settings) => dispatch(reStart(settings))}
            onStart={() => dispatch(start())}
            onClear={() => dispatch(clear())}
            onPause={() => dispatch(pause())}
          />
        </FlexBox>
        <div>
          <Board
            cellsData={state.app.cellsData}
            onCellClick={(coord) => dispatch(toggleCell(coord))}
          />
        </div>
      </FlexBox>
    </>
  );
}

export default App;
