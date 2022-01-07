import { configureStore } from '@reduxjs/toolkit';
import reducer, { onLogin, onLogout, setUser } from './userSlice';

describe('userSlice reducer', () => {
  it('setUser', () => {
    const newState = reducer({ name: '' }, setUser('my name'));
    expect(newState).toEqual({ name: 'my name' });
  });

  it('onLogin', () => {
    const store = configureStore({ reducer });
    store.dispatch(onLogin('my name'));
    expect(store.getState()).toEqual({ name: 'my name' });
  });

  it('onLogout', () => {
    const store = configureStore({ reducer });
    store.dispatch(onLogout());
    expect(store.getState()).toEqual({ name: '' });
  });
});
