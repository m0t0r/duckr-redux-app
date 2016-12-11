import React, {PropTypes} from 'react';
import {DuckContainer} from 'containers';
import {formatReply} from 'helpers/utils';

import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'shared-styles/styles.css';

function Reply({submit}) {
  function handleSubmit(e) {
    if(Reply.ref.value.length === 0) {
      return;
    }

    submit(Reply.ref.value, e);
    Reply.ref.value = '';
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea className={replyTextArea}
        ref={(ref) => Reply.ref = ref}
        maxLength={140}
        placeholder='Your reply'
        type='text'/>
      <button onClick={handleSubmit} className={darkBtn}>{'Submit'}</button>
    </div>
  );
}


const DuckDetails = (props) => {
  return (
    <div className={mainContainer}>
      {props.isFetching
        ? <p className={subHeader}>{'Loading...'}</p>
        : <div className={container}>
            <div className={content}>
              <DuckContainer duckId={props.duckId} hideLikeCount={false} hideReplyBtn={true}/>
               <Reply submit={(value, e) =>
                 props.addAndHandleReply(props.duckId, formatReply(props.authedUser, value))
               }/>
            </div>
            <div className={repliesContainer}>
              REPLY SECTION HERE
            </div>
          </div>
      }
      {props.error ? <p className={errorMsg}>{props.error}</p>: null}
    </div>
  );
};

DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
};

export default DuckDetails;
