import { takeEvery } from 'redux-saga/effects';
import { appActions, playGame } from './appSlice';
import { userActions, onLogin, onLogout } from './userSlice';

export default function* rootSaga() {
  yield takeEvery(userActions.login.type, onLogin);
  yield takeEvery(userActions.logout.type, onLogout);
  yield takeEvery(appActions.start.type, playGame);
}
