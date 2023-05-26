import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useTranslate from '../../store/use-translate';
import { messages } from '../../store/lang/messages';

function BasketTool({ sum, amount, onOpen }) {
  const t = useTranslate();
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{messages[t].inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              {
                one: `${messages[t].product1}`,
                few: `${messages[t].product2}`,
                many: 'товаров',
                other: `${messages[t].product2}`,
              },
              t
            )} / ${numberFormat(sum)} ₽`
          : `${messages[t].empty}`}
      </span>
      <button onClick={onOpen}>{messages[t].go}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
