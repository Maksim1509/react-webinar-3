import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart(props) {
  const items = Object.values(props.cart).map(({ item, count, sum }) => ({
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
          <button className='Cart-btn' onClick={props.onModalClose}>
            Закрыть
          </button>
        </div>

        {items.length ? (
          <>
            <List
              list={items}
              bntName={'Удалить'}
              onClick={props.onDropFromCart}
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

Cart.propTypes = {
  cart: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    sum: PropTypes.number,
  }).isRequired,
  onModalClose: PropTypes.func,
  onDropFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onDropFromCart: () => {},
  onModalClose: () => {},
};

export default React.memo(Cart);
