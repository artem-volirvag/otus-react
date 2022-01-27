import { State, CellsData } from '../types';
import reducer, {
  setSettings,
  clear,
  pause,
  reStart,
  setCellsData,
  start,
  toggleCell,
} from './appSlice';

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

  it('setSettings change boardFillPercent', () => {
    const newSettings = { ...initState.settings, boardFillPercent: 20 };
    const newState = reducer(initState, setSettings(newSettings));
    expect(newState).toEqual({
      ...initState,
      settings: newSettings,
    });
  });

  it('setSettings change boardSize', () => {
    const newState = reducer(
      initState,
      setSettings({ ...initState.settings, boardSize: { x: 5, y: 4 } })
    );
    expect(newState.settings).toEqual({
      ...initState.settings,
      boardSize: { x: 5, y: 4 },
    });
    expect(newState.cellsData).toHaveLength(4);
    expect(newState.cellsData[0]).toHaveLength(5);
  });

  it('setCellsData', () => {
    const newCellsData: CellsData = [
      [0, 1],
      [1, 0],
    ];
    expect(reducer(initState, setCellsData(newCellsData))).toEqual({
      ...initState,
      cellsData: newCellsData,
    });
  });

  it('toggleCell', () => {
    expect(initState.cellsData[0][0]).toBe(0);
    let newState = reducer(initState, toggleCell({ x: 0, y: 0 }));
    expect(newState.cellsData[0][0]).toBe(1);
    newState = reducer(initState, toggleCell({ x: 0, y: 0 }));
    expect(initState.cellsData[0][0]).toBe(0);
    expect(newState.settings).toEqual(initState.settings);
    newState = reducer(initState, toggleCell({ x: -1, y: -1 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, toggleCell({ x: -1, y: 0 }));
    expect(newState.cellsData).toBe(initState.cellsData);
    newState = reducer(initState, toggleCell({ x: 100, y: 100 }));
    expect(newState.cellsData).toBe(initState.cellsData);
  });

  it('reStart', () => {
    const newSettings = {
      boardFillPercent: 10,
      boardSize: { x: 10, y: 10 },
      speed: 2,
    };
    const newState = reducer(initState, reStart(newSettings));
    expect(newState.status).toBe('stop');
    expect(newState.settings).toEqual(newSettings);
    expect(newState.cellsData).toHaveLength(10);
    expect(newState.cellsData[0]).toHaveLength(10);
  });

  it('start', () => {
    expect(reducer(initState, start()).status).toBe('play');
  });

  it('pause', () => {
    expect(reducer(initState, pause()).status).toBe('pause');
  });

  it('clear', () => {
    const newState = reducer(initState, clear());
    expect(newState.settings).toEqual(initState.settings);
    expect(newState.cellsData).toHaveLength(initState.settings.boardSize.y);
    expect(newState.cellsData[0]).toHaveLength(initState.settings.boardSize.x);
  });
});
