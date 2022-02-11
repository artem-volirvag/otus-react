import { cellStateAlive } from '../constants';
import { State, CellsData } from '../types';
import reducer, { appActions, initialSettings } from './appSlice';
import { userActions } from './userSlice';

jest.mock(
  './saga',
  () =>
    function* rootSaga() {
      yield 1;
    }
);

describe('appSlice reducer', () => {
  const initState: State = {
    cellsData: [
      [0, 1, 0],
      [1, 0, 0],
    ],
    settings: {
      boardFillPercent: 10,
      boardSize: {
        x: 3,
        y: 2,
      },
      speed: 1,
    },
    status: 'stop',
  };

  it('should setSettings change boardFillPercent', () => {
    const newSettings = { ...initState.settings, boardFillPercent: 20 };
    const newState = reducer(initState, appActions.setSettings(newSettings));
    expect(newState).toEqual({
      ...initState,
      settings: newSettings,
    });
  });

  it('should setSettings change boardSize', () => {
    const newBoardSize = { x: 5, y: 4 };
    const newState = reducer(
      initState,
      appActions.setSettings({ ...initState.settings, boardSize: newBoardSize })
    );
    expect(newState.settings).toEqual({
      ...initState.settings,
      boardSize: newBoardSize,
    });
    expect(newState.cellsData).toHaveLength(4);
    expect(newState.cellsData[0]).toHaveLength(5);
  });

  it('should setSettings nochange boardSize', () => {
    const newSettings = {
      boardFillPercent: 99,
      speed: 3,
      boardSize: initState.settings.boardSize,
    };
    const newState = reducer(initState, appActions.setSettings(newSettings));
    expect(newState.settings).toEqual(newSettings);
    expect(newState.cellsData).toEqual(initState.cellsData);
  });

  it('should setCellsData set cellsData', () => {
    const newCellsData: CellsData = [
      [0, 1],
      [1, 0],
    ];
    expect(reducer(initState, appActions.setCellsData(newCellsData))).toEqual({
      ...initState,
      cellsData: newCellsData,
    });
  });

  it('should toggleCell toggle cell state in board', () => {
    expect(initState.cellsData[0][0]).toBe(0);
    let newState = reducer(initState, appActions.toggleCell({ x: 0, y: 0 }));
    expect(newState.cellsData[0][0]).toBe(1);
    newState = reducer(newState, appActions.toggleCell({ x: 0, y: 0 }));
    expect(newState.cellsData[0][0]).toBe(0);
  });

  it('toggleCell out of board', () => {
    let newState = reducer(
      initState,
      appActions.toggleCell({ x: 0, y: initState.cellsData.length })
    );
    expect(newState.cellsData).toBe(initState.cellsData);
    expect(newState.settings).toEqual(initState.settings);
    newState = reducer(initState, appActions.toggleCell({ x: -1, y: -1 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, appActions.toggleCell({ x: -1, y: 0 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, appActions.toggleCell({ x: 0, y: -1 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, appActions.toggleCell({ x: 100, y: 100 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, appActions.toggleCell({ x: 100, y: 0 }));
    expect(newState.cellsData).toBe(initState.cellsData);
  });

  it('reStart', () => {
    const newSettings = {
      boardFillPercent: 10,
      boardSize: { x: 10, y: 10 },
      speed: 2,
    };
    const newState = reducer(initState, appActions.reStart(newSettings));
    expect(newState.status).toBe('stop');
    expect(newState.settings).toEqual(newSettings);
    expect(newState.cellsData).toHaveLength(10);
    expect(newState.cellsData[0]).toHaveLength(10);
  });

  it('start', () => {
    expect(initState.status).toBe('stop');
    expect(reducer(initState, appActions.start()).status).toBe('play');
  });

  it('pause', () => {
    expect(reducer(initState, appActions.pause()).status).toBe('pause');
  });

  it('clear', () => {
    const newState = reducer(initState, appActions.clear());
    expect(newState.settings).toEqual(initState.settings);
    expect(newState.cellsData).toHaveLength(initState.settings.boardSize.y);
    expect(newState.cellsData[0]).toHaveLength(initState.settings.boardSize.x);
    expect(
      newState.cellsData.find((row) =>
        row.find((cell) => cell === cellStateAlive)
      )
    ).toBe(undefined);
  });

  it('logout should reset state to init', () => {
    const newState = reducer(initState, userActions.logout());
    expect(newState.settings).toEqual(initialSettings);
    expect(newState.status).toBe('stop');
    expect(newState.cellsData).toHaveLength(initialSettings.boardSize.y);
    expect(newState.cellsData[0]).toHaveLength(initialSettings.boardSize.x);
  });
});
