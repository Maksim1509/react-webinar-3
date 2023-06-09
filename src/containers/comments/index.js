import { memo, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import { useSelector as useReduxSelector } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import CommentsList from '../../components/comments-list';
import ReplyForm from '../../components/reply-form';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();

  const reduxSelect = useReduxSelector(
    (state) => ({
      list: state.comments.list,
      count: state.comments.count,
      waiting: state.comments.waiting,
      send: state.comments.send,
      commentReplyId: state.comments.commentReplyId,
    }),
    shallowequal
  );

  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [select.exists]);

  useEffect(() => {
    if (reduxSelect.send) dispatch(commentsActions.load(params.id));
  }, [reduxSelect.send]);

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onReply: useCallback((id) => {
      console.log(id);
      dispatch(commentsActions.reply(id));
      console.log(id);
    }, []),

    // Отправка комментария
    onSubmit: useCallback((text) => {
      dispatch(
        commentsActions.add({
          text,
          parent: { _id: params.id, _type: 'article' },
        })
      );
    }),
  };

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <h2>
        {t('comments')}: ({reduxSelect.count})
      </h2>
      <CommentsList
        list={reduxSelect.list}
        onReply={callbacks.onReply}
        commentReplyId={reduxSelect.commentReplyId}
        t={t}
        replyForm={
          <ReplyForm
            title={t('reply.titleNewReply')}
            labelSend={t('reply.labelSend')}
            labelCancel={t('reply.labelCancel')}
            onSubmit={callbacks.onSubmit}
          />
        }
      />
      {select.exists && !reduxSelect.commentReplyId && (
        <ReplyForm
          title={t('reply.titleNewComment')}
          labelSend={t('reply.labelSend')}
          onSubmit={callbacks.onSubmit}
        />
      )}
      {!select.exists && <Link to={'/login'}>Войдите</Link>}
    </Spinner>
  );
}

export default memo(Comments);
