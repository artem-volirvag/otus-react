import { loadLogin, LOCAL_STORAGE_LOGIN_KEY, saveLogin } from './localStorage';

describe('localstorage', () => {
  test('should key not empty', () => {
    expect(LOCAL_STORAGE_LOGIN_KEY).not.toBe('');
  });

  test('should save and load', () => {
    saveLogin('test');
    expect(loadLogin()).toBe('test');
  });
});
