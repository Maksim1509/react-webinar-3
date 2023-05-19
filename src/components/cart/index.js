import React, { useCallback } from 'react';
import List from '../list';
import { store } from '../../';
import './style.css';

function Cart() {
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
      <div className='Cart-overlay'></div>
      <div className='Cart'>
        <div className='Cart-head'>
          <h2 className='Cart-title'>Корзина</h2>
          <button className='Cart-btn' onClick={callbacks.onModalClose}>
            Закрыть
          </button>
        </div>

        {items.length ? (
          <>
            <List
              list={items}
              bntName={'Удалить'}
              onClick={callbacks.onDropFromCart}
            />
            <div className='Cart-summary'>
              <span>Итого</span>
              <span>{sum} ₽</span>
            </div>
          </>
        ) : (
          <p className='Cart-content'>В корзине пусто</p>
        )}
      </div>
    </>
  );
}

export default Cart;
