import { cellStateAlive, cellStateEmpty } from '../constants';
import { CellsData, Coordinates, GameSettings, State } from '../types';
import { generateBoard, generateBoardXY, resizeBoard } from '../utils';

export type AppAction =
  | { type: 'setSettings'; payload: GameSettings }
  | { type: 'setCellsData'; payload: CellsData }
  | { type: 'toggleCell'; payload: Coordinates }
  | { type: 'reStart'; payload: GameSettings }
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'clear' };

export default function reducer(prevState: State, action: AppAction): State {
  switch (action.type) {
    case 'setSettings': {
      const cellsData =
        action.payload.boardSize.x !== prevState.settings.boardSize.x ||
        action.payload.boardSize.y !== prevState.settings.boardSize.y
          ? resizeBoard(prevState.cellsData, action.payload.boardSize)
          : prevState.cellsData;
      return { ...prevState, settings: action.payload, cellsData };
    }
    case 'setCellsData':
      return { ...prevState, cellsData: action.payload };
    case 'toggleCell':
      const coord = action.payload;
      if (prevState.cellsData.length < coord.y || coord.y < 0) return prevState;
      if (coord.x < 0 || prevState.cellsData[coord.y].length < coord.x)
        return prevState;
      const cellsData = prevState.cellsData;
      cellsData[coord.y][coord.x] =
        cellsData[coord.y][coord.x] === cellStateAlive
          ? cellStateEmpty
          : cellStateAlive;
      return { ...prevState, cellsData };
    case 'reStart': {
      const cellsData = generateBoard(action.payload);
      return {
        ...prevState,
        status: 'play',
        cellsData,
        settings: action.payload,
      };
    }
    case 'start':
      return { ...prevState, status: 'play' };
    case 'pause':
      return { ...prevState, status: 'pause' };
    case 'clear':
      return {
        ...prevState,
        cellsData: generateBoardXY(
          prevState.settings.boardSize,
          cellStateEmpty
        ),
      };
    default:
      return prevState;
  }
}
