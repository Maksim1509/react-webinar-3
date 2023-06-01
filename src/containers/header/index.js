import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import LoginBtn from '../../components/login-btn';

function Header() {
  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <header>
      <LoginBtn link='/login' labelLogin={t('labelLogin')} />
    </header>
  );
}

export default memo(Header);
