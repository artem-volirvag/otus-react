import { initialState } from './appSlice';
import { selectState, selectIsLogined, selectApp } from './selectors';
import store from './store';

describe('selectors', () => {
  test('should select state', () => {
    expect(selectState(store.getState())).toEqual({
      app: initialState,
      user: {
        name: '',
      },
    });
    expect(selectIsLogined(store.getState())).toBeFalsy();
    expect(selectApp(store.getState())).toEqual(initialState);
  });
});
