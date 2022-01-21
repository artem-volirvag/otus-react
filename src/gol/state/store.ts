import { configureStore, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appSlice';
import rootSaga from './saga';
import userReducer from './userSlice';

/**
 * Logs all actions and states after they are dispatched.
 */
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware({ thunk: false }).concat([
          loggerMiddleware,
          sagaMiddleware,
        ])
      : getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectState = (state: RootState): RootState => state;
export const selectIsLogined = (state: RootState): boolean =>
  state.user && state.user.name !== '';
