import { renderHook } from '@testing-library/react-hooks';
import { useLogin } from './useLogin';
import { ROUTE } from './constants';
import { selectIsLogined } from './state/store';

const mockNavigate = jest.fn();

jest
  .mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
  }))
  .mock('react-redux', () => ({
    useSelector: (selector: () => unknown) => selector(),
  }))
  .mock('./state/store');

describe('useLogin', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('Logined', async () => {
    (selectIsLogined as any).mockImplementation(() => true);
    const { result } = renderHook(useLogin);
    expect(result.current.isLogined).toEqual(true);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.ROOT);
  });

  test('not Logined', async () => {
    (selectIsLogined as any).mockImplementation(() => false);
    const { result } = renderHook(useLogin);
    expect(result.current.isLogined).toEqual(false);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN);
  });
});
