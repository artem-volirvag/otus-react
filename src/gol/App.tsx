import React, { useReducer } from 'react';
import Board from './components/Board';
import Settings from './components/Settings';
import { FlexBox } from './elements/FlexBox';
import reducer from './state/Reducer';
import { GameSettings, State } from './types';
import { generateBoard } from './utils';
import { useLogin } from './useLogin';

const initialSettings: GameSettings = {
  boardFillPercent: 15,
  speed: 2,
  boardSize: {
    x: 50,
    y: 50,
  },
};

const initialState: State = {
  settings: initialSettings,
  status: 'stop',
  cellsData: generateBoard(initialSettings),
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { login, onLogout } = useLogin();

  if (!login) return null;

  return (
    <>
      <h1>Game of life</h1>
      <FlexBox>
        <FlexBox flexDirection={'vertical'}>
          <div>
            Здравствуйте, <strong>{login}</strong>
          </div>
          <button type="button" onClick={onLogout}>
            Выход
          </button>
          <Settings
            settings={state.settings}
            status={state.status}
            onChangeSettings={(settings) =>
              dispatch({ type: 'setSettings', payload: settings })
            }
            onReStart={(settings) =>
              dispatch({ type: 'reStart', payload: settings })
            }
            onStart={() => dispatch({ type: 'start' })}
            onClear={() => dispatch({ type: 'clear' })}
            onPause={() => dispatch({ type: 'pause' })}
          />
        </FlexBox>
        <div>
          <Board
            cellsData={state.cellsData}
            onCellClick={(coord) =>
              dispatch({ type: 'toggleCell', payload: coord })
            }
          />
        </div>
      </FlexBox>
    </>
  );
}

export default App;
