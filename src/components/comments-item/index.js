import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsItem(props) {
  const cn = bem('CommentsItem');

  const callbacks = {
    onReply: (e) => {
      e.preventDefault();
      props.onReply(props.item._id);
    },
  };
  return (
    <div className={cn()}>
      <div className={cn('name')}>{props.item.author.profile.name}</div>
      <div className={cn('date')}>{props.item.dateCreate}</div>
      <p className={cn('text')}>{props.item.text}</p>
      <a className={cn('link')} onClick={callbacks.onReply}>
        {props.replyLabel}
      </a>
    </div>
  );
}

// Item.propTypes = {
//   item: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     title: PropTypes.string,
//     price: PropTypes.number,
//   }).isRequired,
//   link: PropTypes.string,
//   onAdd: PropTypes.func,
//   labelCurr: PropTypes.string,
//   labelAdd: PropTypes.string,
// };

// Item.defaultProps = {
//   onAdd: () => {},
//   labelCurr: '₽',
//   labelAdd: 'Добавить',
// };

export default memo(CommentsItem);
