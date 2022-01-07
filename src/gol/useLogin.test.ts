import { renderHook, act } from '@testing-library/react-hooks';

import { useLogin } from './useLogin';
import { ROUTE } from './constants';
import { LOCAL_STORAGE_LOGIN_KEY } from './localStorage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

let mockGetItem = jest.fn(() => 'test');
const mockSetItem = jest.fn();
global.Storage.prototype.getItem = mockGetItem;
global.Storage.prototype.setItem = mockSetItem;

describe('useLogin', () => {
  test('loadLogin', async () => {
    const { result } = renderHook(useLogin);
    expect(mockGetItem).toHaveBeenCalledTimes(1);
    expect(result.current.login).toEqual('test');
  });

  test('onLogin', async () => {
    mockSetItem.mockClear();
    mockNavigate.mockClear();
    const { result } = renderHook(useLogin);
    act(() => {
      result.current.onLogin('Логин');
    });
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith(LOCAL_STORAGE_LOGIN_KEY, 'Логин');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.ROOT);
  });

  test('onLogout', async () => {
    mockSetItem.mockClear();
    mockNavigate.mockClear();
    expect(mockSetItem).toHaveBeenCalledTimes(0);
    const { result } = renderHook(useLogin);
    act(() => {
      result.current.onLogout();
    });
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith(LOCAL_STORAGE_LOGIN_KEY, '');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN);
  });

  test('loadLogin Empty', async () => {
    mockGetItem.mockClear();
    mockNavigate.mockClear();
    mockGetItem = jest.fn(() => '');
    global.Storage.prototype.getItem = mockGetItem;
    const { result } = renderHook(useLogin);
    expect(mockGetItem).toHaveBeenCalledTimes(1);
    expect(result.current.login).toEqual('');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN);
  });
});
