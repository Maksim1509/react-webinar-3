import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Nav from '../../components/nav';
import './style.css';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    pagesCount: state.catalog.pagesCount,
    activePage: state.catalog.activePage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

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
    changePage: useCallback(
      (activePage) => store.actions.catalog.changePage(activePage),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <div className='main-controls'>
        <Nav />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </div>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onChangePage={callbacks.changePage}
        pagesCount={select.pagesCount}
        activePage={select.activePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
