import { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ReplyForm(props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Обработчик изменений в поле
  const callbacks = {
    onChange: useCallback((event) => {
      setValue(event.target.value);
    }),
    onSubmit: useCallback((event) => {
      event.preventDefault();
      props.onSubmit(value.trim());
      setValue(() => '');
      textareaRef.current.focus();
    }),
  };

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const cn = bem('ReplyForm');

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h3 className={cn('title')}>{props.title}</h3>
      <textarea
        className={cn('input')}
        type='textarea'
        name='text'
        value={value}
        onChange={callbacks.onChange}
        required
        ref={textareaRef}
      />
      <div>
        <button className={cn('btn')} type='submit'>
          {props.labelSend}
        </button>
        {props.labelCancel && (
          <button className={cn('btn')} onClick={props.onCancel}>
            {props.labelCancel}
          </button>
        )}
      </div>
    </form>
  );
}

ReplyForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};

ReplyForm.defaultProps = {
  onSubmit: () => {},
  title: 'Новый комментарий',
};

export default memo(ReplyForm);
