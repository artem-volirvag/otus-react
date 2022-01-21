import { expectSaga } from 'redux-saga-test-plan';
import reducer, { login, onLogin, onLogout, setUser } from './userSlice';
import { loadLogin } from '../localStorage';

describe('userSlice reducer', () => {
  it('setUser', () => {
    const newState = reducer({ name: '' }, setUser('my name'));
    expect(newState).toEqual({ name: 'my name' });
  });

  it('onLogin', () => {
    const testUserName = 'my name';
    const res = expectSaga(onLogin, { type: login.type, payload: testUserName })
      .withReducer(reducer)
      .hasFinalState({
        name: testUserName,
      })
      .run();
    expect(loadLogin()).toBe(testUserName);
    return res;
  });

  it('onLogout', () => {
    const res = expectSaga(onLogout)
      .withReducer(reducer)
      .hasFinalState({
        name: '',
      })
      .run();
    expect(loadLogin()).toBe('');
    return res;
  });
});