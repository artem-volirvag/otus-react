import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlexBox } from '../elements/FlexBox';
import { Input } from '../elements/Input';
import { login } from '../state/userSlice';
import { useLogin } from '../useLogin';

function FormLogin() {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  useLogin();

  return (
    <FlexBox justifyContent={'center'}>
      <FlexBox flexDirection={'vertical'} width={'200px'}>
        <Input
          type="text"
          id="login"
          placeholder="Введите ваше имя"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
        />
        <button type="button" onClick={() => dispatch(login(userName))}>
          Старт
        </button>
      </FlexBox>
    </FlexBox>
  );
}

export default FormLogin;
