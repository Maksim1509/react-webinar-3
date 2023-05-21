import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import { store } from '../../';
import './style.css';
import { numberFormat } from '../../utils';
import CartItem from '../cart-item';

function Cart() {
  const cn = bem('Cart');
  const { totalCount, totalPrice, cart } = store.getState();
  const callbacks = {
    onModalClose: useCallback(() => store.modalClose(), [store]),
  };

  const items = Array.from(cart.values());

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

        {totalCount ? (
          <>
            <List list={items}>
              {(props) => <CartItem item={{ ...props }} />}
            </List>
            <div className={cn('summary')}>
              <span>Итого</span>
              <span>{numberFormat(totalPrice)} ₽</span>
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
