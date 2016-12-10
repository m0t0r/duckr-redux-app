import React, {PropTypes} from 'react';
import {centeredContainer, largeHeader, errorMsg} from 'shared-styles/styles.css';
import {GithubAuthButton} from 'components';

const Authenticate = ({onAuth, isFetching, error}) => {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <GithubAuthButton isFetching={isFetching} onAuth={onAuth}/>
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  );
};

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
};

export default Authenticate;
