import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {
  initState() {
    return {
      isAuth: localStorage.getItem('USER_TOKEN') ? true : false,
      token: localStorage.getItem('USER_TOKEN') || null,
      username: localStorage.getItem('USER_NAME') || null,
      waiting: false,
    };
  }

  /**
   * Авторизация
   * @param data {object}
   * @return {Promise<void>}
   */
  async auth(data) {
    // Установка признака ожидания загрузки
    this.setState({
      isAuth: false,
      token: null,
      username: null,
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          ['Content-Type']: 'application/json',
        },
        body: JSON.stringify(data),
      });
      const { result } = await response.json();

      localStorage.setItem('USER_TOKEN', result.token);
      localStorage.setItem('USER_NAME', result.user.profile.name);

      // Пользователь Авторизован
      this.setState(
        {
          isAuth: true,
          token: result.token,
          username: result.user.profile.name,
          waiting: false,
        },
        'Пользователь Авторизован'
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        isAuth: false,
        waiting: false,
      });
    }
  }

  /**
   * Выход
   * @return {Promise<void>}
   */
  async logOut() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          ['X-Token']: this.getState().token,
          ['Content-Type']: 'application/json',
        },
      });

      this.setState({
        isAuth: false,
        token: null,
        username: null,
        waiting: false,
      });
      localStorage.removeItem('USER_TOKEN');
      localStorage.removeItem('USER_NAME');
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        isAuth: false,
        waiting: false,
      });
    }
  }
}

export default AuthState;
