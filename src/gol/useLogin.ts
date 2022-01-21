import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from './constants';
import { useSelector } from 'react-redux';
import { selectIsLogined } from './state/store';

export function useLogin() {
  const navigate = useNavigate();
  const isLogined = useSelector(selectIsLogined);

  useEffect(() => {
    if (!isLogined) {
      navigate(ROUTE.LOGIN);
    } else {
      navigate(ROUTE.ROOT);
    }
  }, [isLogined]);

  return { isLogined };
}
