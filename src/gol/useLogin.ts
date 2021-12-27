import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from './constants';

export const LOCAL_STORAGE_LOGIN_KEY = 'login';

export const saveLogin = (login: string) => {
  localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, login);
};

export const loadLogin = () => {
  return localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY);
};

export function useLogin() {
  const navigate = useNavigate();

  const loginRef = useRef<string | null>(loadLogin());

  useEffect(() => {
    // loginRef.current = loadLogin();
    if (!loginRef.current) {
      navigate('/login');
    }
  }, []);

  const onLogin = (login: string) => {
    if (!login) return;
    saveLogin(login);
    loginRef.current = login;
    navigate(ROUTE.ROOT);
  };

  const onLogout = () => {
    saveLogin('');
    loginRef.current = null;
    navigate(ROUTE.LOGIN);
  };

  return { login: loginRef.current, onLogin, onLogout };
}
