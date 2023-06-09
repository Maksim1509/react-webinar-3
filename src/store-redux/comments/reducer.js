// Начальное состояние
const initialState = {
  list: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  send: false,
  commentReplyId: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      const comments = action.payload.data.items.filter((i) => !i.isDeleted);
      return {
        ...state,
        list: comments,
        waiting: false,
        count: comments.length,
      };

    case 'comments/load-error':
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/add-start':
      return { ...state, waiting: true, send: false };

    case 'comments/add-success':
      return { ...state, waiting: false, send: true };

    case 'comments/add-error':
      return { ...state, waiting: false, send: false }; //@todo текст ошибки сохранить?

    case 'comments/reply':
      return { ...state, commentReplyId: action.payload.id };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
