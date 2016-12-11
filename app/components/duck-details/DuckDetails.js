import React, {PropTypes} from 'react';
import {DuckContainer} from 'containers';

import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'shared-styles/styles.css';

const DuckDetails = (props) => {
  return (
    <div className={mainContainer}>
      {props.isFetching
        ? <p className={subHeader}>{'Loading...'}</p>
        : <div className={container}>
            <div className={content}>
              <DuckContainer duckId={props.duckId} hideLikeCount={false} hideReplyBtn={true}/>
               MAKE REPLY
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
  error: PropTypes.string.isRequired
};

export default DuckDetails;
