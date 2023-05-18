import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(props) {
  return (
    <div className='List'>
      {props.list.map((item) => (
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToCart={props.onAddToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  onAddToCart: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(List);
