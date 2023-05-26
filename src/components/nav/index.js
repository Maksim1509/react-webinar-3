import { Link } from 'react-router-dom';
import './style.css';
import useTranslate from '../../store/use-translate';
import { messages } from '../../store/lang/messages';

function Nav() {
  const t = useTranslate();
  return (
    <nav className='Nav'>
      <Link className='Nav-link' to={'/'}>
        {messages[t].main}
      </Link>
    </nav>
  );
}

export default Nav;
