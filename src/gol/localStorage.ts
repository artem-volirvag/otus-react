export const LOCAL_STORAGE_LOGIN_KEY = 'login';

export const saveLogin = (login: string) => {
  localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, login);
};

export const loadLogin = () => {
  return localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY);
};
