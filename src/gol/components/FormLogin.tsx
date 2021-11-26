import React, { useState } from 'react';
import { FlexBox } from '../elements/FlexBox';
import { Input } from '../elements/Input';

interface FormLoginProps {
  onSubmit: (login: string) => void;
}

function FormLogin({ onSubmit }: FormLoginProps) {
  const [login, setLogin] = useState('');

  return (
    <FlexBox flexDirection={'vertical'} width={'200px'}>
      <Input
        type="text"
        id="login"
        placeholder="Введите ваше имя"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLogin(e.target.value)
        }
      />
      <button type="button" onClick={() => onSubmit(login)}>
        Старт
      </button>
    </FlexBox>
  );
}

export default FormLogin;
