import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CommentsItem from '../comments-item';
import Input from '../../components/input';
import Field from '../../components/field';
import ReplyForm from '../reply-form';

function CommentsList(props) {
  return (
    <div className='CommentsList'>
      {props.list.map((item) => (
        <div key={item._id} className='CommentsList-item'>
          <CommentsItem
            item={item}
            onReply={props.onReply}
            replyLabel={props.t('reply')}
          />
          {props.commentReplyId === item._id && <>{props.replyForm}</>}
        </div>
      ))}
    </div>
  );
}

// List.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//   })).isRequired,
//   renderItem: PropTypes.func,
// };

// List.defaultProps = {
//   renderItem: (item) => {},
// }

export default memo(CommentsList);
