import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function Summary(props) {
  const cn = bem('Summary');

  const items = Object.values(props.cart);
  const sum = items.reduce((acc, { sum }) => acc + sum, 0);
  const count = items.length;
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        В корзине:{' '}
        <b>
          {count
            ? `${count} ${plural(count, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : 'пусто'}
        </b>
      </div>
      <div className={cn('actions')}>{props.children}</div>
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

export default React.memo(Summary);
