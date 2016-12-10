import React, {PropTypes} from 'react';
import {button} from './styles.css';

const GithubAuthButton = ({onAuth, isFetching}) => {
  return (
    <button className={button} onClick={onAuth}>{isFetching ? 'Loading' : 'Login with Github'}</button>
  );
};

GithubAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default GithubAuthButton;
