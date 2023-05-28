import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticleInfo from '../../components/article-info';
import Nav from '../../components/nav';
import './style.css';

function Article() {
  const store = useStore();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const _id = params._id;

  useEffect(() => {
    function fetchData() {
      try {
        setLoading(true);
        fetch(
          `/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`
        )
          .then((res) => res.json())
          .then((json) => {
            setItem(json.result);
            setLoading(false);
          });
      } catch (e) {
        setLoading(false);
        alert(e.message);
      }
    }
    fetchData();
  }, [_id]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={item && item.title} />
      <div className='Article-controls'>
        <Nav />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </div>
      {loading ? (
        <p className='Article-loading'>Loading...</p>
      ) : (
        <ArticleInfo article={{ ...item }} onAdd={callbacks.addToBasket} />
      )}
    </PageLayout>
  );
}

export default memo(Article);
