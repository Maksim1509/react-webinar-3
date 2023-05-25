import { Link } from 'react-router-dom';
import './style.css';

function Nav() {
  return (
    <nav className='Nav'>
      <Link className='Nav-link' to={'/'}>
        Главная
      </Link>
    </nav>
  );
}

export default Nav;
