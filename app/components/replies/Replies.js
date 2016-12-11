import React, {PropTypes} from 'react';
import {
  avatar, replyContainer, header,
  cushion, center, author } from './styles.css'
import { errorMsg, subHeader } from 'shared-styles/styles.css'
import { formatTimestamp } from 'helpers/utils'

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar} />
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  )
}

Reply.propTypes = {
  comment: PropTypes.object.isRequired,
};

const Replies = (props) => {
  const replyIds = Object.keys(props.replies);

  return (
    <div >
      {props.isFetching
       ? <p className={subHeader}>{'Loading...'}</p>
      : <div>
        <h1 className={header}>{'Replies'}</h1>
        {replyIds.map((replyId) => (
          <Reply key={replyId} comment={props.replies[replyId]} />
        ))}
      </div>
      }
      {replyIds.length === 0 ? <h3 className={center}>{'Be the first to comment. 😎'}</h3> : null}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
  );
};

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number.isRequired
};

export default Replies;
