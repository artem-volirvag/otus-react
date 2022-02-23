import { cellStateAlive, cellStateEmpty } from './constants';

export type CellState = typeof cellStateAlive | typeof cellStateEmpty;

export type CellsData = Array<Array<CellState>>;

export interface Coordinates {
  y: number;
  x: number;
}
export interface BoardSize {
  x: number;
  y: number;
}
export interface GameSettings {
  boardSize: BoardSize;
  boardFillPercent: number;
  speed: number;
}

export interface State {
  settings: GameSettings;
  cellsData: CellsData;
  status: 'pause' | 'play' | 'stop';
}

export type GameStatus = State['status'];

export interface UserState {
  name: string;
}
