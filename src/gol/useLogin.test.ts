import { renderHook } from '@testing-library/react-hooks';
import { useLogin } from './useLogin';
import { ROUTE } from './constants';
import { selectIsLogined } from './state/selectors';

const mockNavigate = jest.fn();

jest
  .mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
  }))
  .mock('react-redux', () => ({
    useSelector: (selector: () => unknown) => selector(),
  }))
  .mock('./state/selectors');

describe('useLogin', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('should navigate logined to root', async () => {
    (selectIsLogined as any).mockImplementation(() => true);
    const { result } = renderHook(useLogin);
    expect(result.current.isLogined).toEqual(true);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.ROOT);
  });

  test('should navigate not logined to login page', async () => {
    (selectIsLogined as any).mockImplementation(() => false);
    const { result } = renderHook(useLogin);
    expect(result.current.isLogined).toEqual(false);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN);
  });
});
