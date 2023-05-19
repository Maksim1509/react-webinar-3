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
  const [modal, setModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onModalOpen: useCallback(() => setModal(true)),
    onModalClose: useCallback(() => setModal(false)),
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
    onDropFromCart: useCallback((code) => store.dropFromCart(code), [store]),
  };

  return (
    <>
      {modal && (
        <Cart
          cart={cart}
          onModalClose={callbacks.onModalClose}
          onDropFromCart={callbacks.onDropFromCart}
        />
      )}
      <PageLayout>
        <Head title='Приложение на чистом JS' />
        <Summary cart={cart}>
          <Controls onModalOpen={callbacks.onModalOpen} />
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
