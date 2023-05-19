import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <button className='Controls-btn' onClick={props.onModalOpen}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
};

Controls.defaultProps = {
  onModalOpen: () => {},
};

export default React.memo(Controls);
