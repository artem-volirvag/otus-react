import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'redux-saga';
import { cancel, delay, fork, put, select, take } from 'redux-saga/effects';
import { cellStateAlive, cellStateEmpty } from '../constants';
import { CellsData, Coordinates, GameSettings, State } from '../types';
import {
  generateBoard,
  generateBoardXY,
  nextGeneration,
  resizeBoard,
  speedToMs,
} from '../utils';
import { selectApp } from './selectors';
import { userActions } from './userSlice';

export const initialSettings: GameSettings = {
  boardFillPercent: 15,
  speed: 2,
  boardSize: {
    x: 50,
    y: 50,
  },
};

export const initialState: State = {
  settings: initialSettings,
  status: 'stop',
  cellsData: generateBoard(initialSettings),
};

export function* gameLoop() {
  while (true) {
    const app: State = yield select(selectApp);
    yield put(appActions.setCellsData(nextGeneration(app.cellsData)));
    yield delay(speedToMs(app.settings.speed));
  }
}

export function* playGame() {
  const task: Task = yield fork(gameLoop);
  yield take([appActions.pause.type, appActions.reStart.type]);
  yield cancel(task);
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
      if (coord.y >= state.cellsData.length || coord.y < 0) return;
      if (coord.x < 0 || coord.x >= state.cellsData[coord.y].length) return;
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
    builder.addCase(userActions.logout.type, (state) => {
      state.status = 'stop';
      state.settings = initialSettings;
      state.cellsData = generateBoard(initialSettings);
    });
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
