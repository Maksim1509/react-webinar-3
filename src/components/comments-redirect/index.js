import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsRedirect(props) {
  const cn = bem('CommentsRedirect');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/login'}>
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
