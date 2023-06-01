import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LoginBtn(props) {
  const cn = bem('LoginBtn');

  return (
    <Link to={props.link} className={cn()}>
      <button className={cn('btn')}>{props.labelLogin}</button>
    </Link>
  );
}

LoginBtn.propTypes = {
  link: PropTypes.string.isRequired,
  labelLogin: PropTypes.string,
};

LoginBtn.defaultProps = {
  labelLogin: 'Войти',
};

export default memo(LoginBtn);
