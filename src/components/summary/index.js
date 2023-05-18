import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Summary(props) {
  const items = Object.values(props.cart);
  const sum = items.reduce((acc, { sum }) => acc + sum, 0);
  const count = items.reduce((acc, { count }) => acc + count, 0);

  return (
    <div className={'Summary'}>
      <div className={'Summary-content'}>
        В корзине:{' '}
        <b>
          {count
            ? `${count} ${plural(count, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${sum} ₽`
            : 'пусто'}
        </b>
      </div>
      <div className='Summary-actions'>{props.children}</div>
    </div>
  );
}

Summary.propTypes = {
  cart: PropTypes.shape({
    item: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
    }),
    count: PropTypes.number,
    sum: PropTypes.number,
  }).isRequired,
};

// Item.defaultProps = {
//   onAddToCart: () => {},
// };

export default React.memo(Summary);
