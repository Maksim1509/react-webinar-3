import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    },
  };
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price} ₽</div>
      {props.item.count && (
        <div className={cn('count')}>{props.item.count} шт</div>
      )}
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onClick}>
          {props.bntName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
