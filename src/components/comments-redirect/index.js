import { memo, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsRedirect(props) {
  const linkRef = useRef(null);
  useEffect(() => {
    if (props.type === 'reply') {
      linkRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, []);
  const cn = bem('CommentsRedirect');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/login'} ref={linkRef}>
        {props.linkText}
      </Link>
      , {props.text}.{' '}
      {props.type === 'reply' && (
        <a className={cn('cancel')} onClick={props.onCancel}>
          {props.labelCancel}
        </a>
      )}
    </div>
  );
}

CommentsRedirect.propTypes = {
  linkText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default memo(CommentsRedirect);
