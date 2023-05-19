import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cart: {} };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: 'Новая запись' },
      ],
    });
  }

  /**
   * Добавление  товара в корзину
   * @param code
   */
  addToCart(code) {
    const item = this.state.list.find((item) => item.code === code);
    const prevCount = this.state.cart[code] ? this.state.cart[code].count : 0;
    const newCount = prevCount + 1;
    const sum = item.price * newCount;
    this.setState({
      ...this.state,
      cart: { ...this.state.cart, [code]: { item, count: newCount, sum } },
    });
  }
  /**
   * Удаление товара из корзины
   * @param code
   */
  dropFromCart(code) {
    const copy = { ...this.state.cart };
    delete copy[code];
    this.setState({
      ...this.state,
      cart: { ...copy },
    });
  }
}

export default Store;
