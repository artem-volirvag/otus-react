import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../elements/Button';
import { FlexBox } from '../elements/FlexBox';
import { Input } from '../elements/Input';
import { login } from '../state/userSlice';
import { useLogin } from '../useLogin';

function FormLogin() {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  useLogin();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onLogin = () => dispatch(login(userName.trim()));

  return (
    <FlexBox justifyContent={'center'}>
      <FlexBox flexDirection={'vertical'} width={'200px'}>
        <Input
          type="text"
          id="login"
          placeholder="Введите ваше имя"
          onChange={onChangeName}
          value={userName}
        />
        <Button type="button" onClick={onLogin} mode={'primary'}>
          Старт
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default FormLogin;
