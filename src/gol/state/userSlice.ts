import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLogin, saveLogin } from '../localStorage';
import { UserState } from '../types';
import { AppDispatch } from './store';

const initialState: UserState = {
  name: loadLogin() || '',
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const onLogin = (name: string) => async (dispatch: AppDispatch) => {
  saveLogin(name);
  dispatch(setUser(name));
};

export const onLogout = () => async (dispatch: AppDispatch) => {
  saveLogin('');
  dispatch(setUser(''));
};
