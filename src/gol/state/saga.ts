import { takeEvery } from 'redux-saga/effects';
import { start, playGame } from './appSlice';
import { RootState } from './store';
import { login, logout, onLogin, onLogout } from './userSlice';

export default function* rootSaga() {
  yield takeEvery(login.type, onLogin);
  yield takeEvery(logout.type, onLogout);
  yield takeEvery(start.type, playGame);
}

export const getApp = (state: RootState) => state.app;

export type AppActionLogin = { type: typeof login.type; payload: string };
export type AppActionLogout = { type: typeof logout.type };
