import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleInfo(props) {
  const cn = bem('ArticleInfo');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.article._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.article.description}</div>
      <div className={cn('madeIn')}>
        Страна производитель:{' '}
        <b>
          {props.article.madeIn.title} ({props.article.madeIn.code})
        </b>
      </div>
      <div className={cn('category')}>
        Категория: <b>{props.article.category.title}</b>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <b>{props.article.edition}</b>
      </div>
      <div className={cn('price')}>
        Цена: <b>{props.article.price} ₽</b>
      </div>

      <div className={cn('btn')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleInfo);
