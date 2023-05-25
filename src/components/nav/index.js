import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='nav'>
      <Link className='nav-link' to={'/'}>
        Главная
      </Link>
    </nav>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default Nav;
