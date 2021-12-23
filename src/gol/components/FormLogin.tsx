import React, { useState } from 'react';
import { FlexBox } from '../elements/FlexBox';
import { Input } from '../elements/Input';
import { useLogin } from '../useLogin';

function FormLogin() {
  const [login, setLogin] = useState('');
  const { onLogin } = useLogin();

  return (
    <FlexBox justifyContent={'center'}>
      <FlexBox flexDirection={'vertical'} width={'200px'}>
        <Input
          type="text"
          id="login"
          placeholder="Введите ваше имя"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
        />
        <button type="button" onClick={() => onLogin(login)}>
          Старт
        </button>
      </FlexBox>
    </FlexBox>
  );
}

export default FormLogin;
