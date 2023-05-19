import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Summary from './components/summary';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, modal } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
  };

  return (
    <>
      {modal && <Cart />}
      <PageLayout>
        <Head title='Магазин' />
        <Summary cart={cart}>
          <Controls />
        </Summary>
        <List
          list={list}
          bntName={'Добавить'}
          onClick={callbacks.onAddToCart}
        />
      </PageLayout>
    </>
  );
}

export default App;
