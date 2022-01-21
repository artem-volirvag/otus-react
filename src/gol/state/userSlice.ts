import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLogin, saveLogin } from '../localStorage';
import { put } from 'redux-saga/effects';
import { AppActionLogin } from './saga';

export const userSlice = createSlice({
  initialState: {
    name: loadLogin() || '',
  },
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (_state, _action: PayloadAction<string>) => void 0,
    logout: () => void 0,
  },
});

export const { setUser, login, logout } = userSlice.actions;

export default userSlice.reducer;

export function* onLogin(action: AppActionLogin) {
  const name = action.payload;
  saveLogin(name);
  yield put(setUser(name));
}

export function* onLogout() {
  saveLogin('');
  yield put(setUser(''));
}
