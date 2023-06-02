import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Form(props) {
  // Внутренний стейт формы
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // Обработчики изменения значений формы
  const onLoginChange = (event) => {
    setLoginValue(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit({
        login: loginValue,
        password: passwordValue,
      });
    },
  };

  const cn = bem('Form');
  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <label className={cn('label')} htmlFor='login'>
        {props.loginLabel}
      </label>
      <input
        className={cn('input')}
        value={loginValue}
        type='text'
        name='login'
        required
        onChange={onLoginChange}
      />
      <label className={cn('label')} htmlFor='password'>
        {props.passwordLabel}
      </label>
      <input
        className={cn('input')}
        value={passwordValue}
        type='password'
        name='password'
        required
        onChange={onPasswordChange}
      />
      <button className={cn('btn')} type='submit'>
        {props.btnLogin}
      </button>
    </form>
  );
}

Form.propTypes = {
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  btnLogin: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  loginLabel: 'Логин',
  passwordLabel: 'Пароль',
  btnLogin: 'Войти',
  onSubmit: () => {},
};

export default memo(Form);
