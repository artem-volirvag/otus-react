import { takeEvery } from 'redux-saga/effects';
import { login, logout, onLogin, onLogout } from './userSlice';

export default function* rootSaga() {
  yield takeEvery(login.type, onLogin);
  yield takeEvery(logout.type, onLogout);
}

export type AppActionLogin = { type: typeof login.type; payload: string };
export type AppActionLogout = { type: typeof logout.type };
