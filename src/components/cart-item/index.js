import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import { store } from '../..';

function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
    onDropFromCart: useCallback(
      (code) => {
        store.dropFromCart(code);
      },
      [store]
    ),
  };
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <button
          className={cn('btn')}
          onClick={() => callbacks.onDropFromCart(props.item.code)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
};

export default React.memo(CartItem);
