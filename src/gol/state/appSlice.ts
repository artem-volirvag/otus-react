import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { delay, put, select } from 'redux-saga/effects';
import { cellStateAlive, cellStateEmpty } from '../constants';
import { CellsData, Coordinates, GameSettings, State } from '../types';
import {
  generateBoard,
  generateBoardXY,
  nextGeneration,
  resizeBoard,
  speedToMs,
} from '../utils';
import { getApp } from './saga';
import { logout } from './userSlice';

export const initialSettings: GameSettings = {
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

export function* playGame() {
  while (true) {
    const app: State = yield select(getApp);
    if (app.status !== 'play') break;
    yield put(setCellsData(nextGeneration(app.cellsData)));
    yield delay(speedToMs(app.settings.speed));
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<GameSettings>) => {
      if (
        action.payload.boardSize.x !== state.settings.boardSize.x ||
        action.payload.boardSize.y !== state.settings.boardSize.y
      ) {
        state.cellsData = resizeBoard(
          state.cellsData,
          action.payload.boardSize
        );
      }
      state.settings = action.payload;
    },
    setCellsData: (state, action: PayloadAction<CellsData>) => {
      state.cellsData = action.payload;
    },
    toggleCell: (state, action: PayloadAction<Coordinates>) => {
      const coord = action.payload;
      if (state.cellsData.length < coord.y || coord.y < 0) return;
      if (coord.x < 0 || state.cellsData[coord.y].length < coord.x) return;
      const cellsData = state.cellsData;
      cellsData[coord.y][coord.x] =
        cellsData[coord.y][coord.x] === cellStateAlive
          ? cellStateEmpty
          : cellStateAlive;
    },
    reStart: (state, action: PayloadAction<GameSettings>) => {
      state.cellsData = generateBoard(action.payload);
      state.status = 'stop';
      state.settings = action.payload;
    },
    start: (state) => {
      state.status = 'play';
    },
    pause: (state) => {
      state.status = 'pause';
    },
    clear: (state) => {
      state.cellsData = generateBoardXY(
        state.settings.boardSize,
        cellStateEmpty
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      state.status = 'stop';
      state.settings = initialSettings;
      state.cellsData = generateBoard(initialSettings);
    });
  },
});

export const {
  clear,
  pause,
  reStart,
  setCellsData,
  setSettings,
  start,
  toggleCell,
} = appSlice.actions;

export const selectApp = (state: State) => state;

export default appSlice.reducer;
