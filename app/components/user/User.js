import React, {PropTypes} from 'react';
import {DuckContainer} from 'containers';
import { userContainer, header } from './styles.css';
import { errorMsg } from 'shared-styles/styles.css';

const User = (props) => {
  return (
    props.noUser
    ? <p className={header}>{'This user does not exist'}</p>
    : <div>
      {props.isFetching
       ? <p className={header}>{'Loading...'}</p>
       : <div>
          <div className={userContainer}>
            <div>{props.name}</div>
          </div>
            {props.duckIds.map((id) => (
              <DuckContainer duckId={id} key={id}/>
            ))}
            {props.duckIds.length === 0
            ? <p className={header}>
              {`It looks like ${props.name.split(' ')[0]} hasn't made any ducks yet.`}
              </p>
            : null}
        </div>
      }
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
  );
};

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
};

export default User;
