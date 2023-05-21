import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import { store } from '../../';
import './style.css';
import { numberFormat } from '../../utils';
import CartItem from '../cart-item';

function Cart() {
  const cn = bem('Cart');

  const callbacks = {
    onDropFromCart: useCallback((code) => store.dropFromCart(code), [store]),
    onModalClose: useCallback(() => store.modalClose(), [store]),
  };
  const items = Object.values(store.state.cart).map(({ item, count, sum }) => ({
    ...item,
    count,
    sum,
  }));

  const sum = items.reduce((acc, { sum }) => acc + sum, 0);

  return (
    <>
      <div className={cn('overlay')}></div>
      <div className={cn()}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('btn')} onClick={callbacks.onModalClose}>
            Закрыть
          </button>
        </div>

        {items.length ? (
          <>
            <List list={items}>
              {(props) => <CartItem item={{ ...props }} />}
            </List>
            <div className={cn('summary')}>
              <span>Итого</span>
              <span>{numberFormat(sum)} ₽</span>
            </div>
          </>
        ) : (
          <p className={cn('content')}>В корзине пусто</p>
        )}
      </div>
    </>
  );
}

export default Cart;
