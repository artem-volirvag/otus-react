import { RootState } from './store';

export const selectState = (state: RootState): RootState => state;
export const selectIsLogined = (state: RootState): boolean =>
  state.user && state.user.name !== '';
export const selectApp = (state: RootState) => state.app;
