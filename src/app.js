import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' />
      <Controls />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
