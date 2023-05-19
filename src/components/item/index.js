import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    },
  };
  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{props.item.price} ₽</div>
      {props.item.count && (
        <div className='Item-count'>{props.item.count} шт</div>
      )}
      <div className='Item-actions'>
        <button className='Item-btn' onClick={callbacks.onClick}>
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
