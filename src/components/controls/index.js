import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <button className='Controls-btn' onClick={() => console.log('Contoll')}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
