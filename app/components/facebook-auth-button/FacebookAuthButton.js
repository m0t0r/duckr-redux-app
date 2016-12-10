import React, {PropTypes} from 'react';
import {button} from './styles.css';

const FacebookAuthButton = ({onAuth, isFetching}) => {
  return (
    <button className={button} onClick={onAuth}>{isFetching ? 'Loading' : 'Login with Facebook'}</button>
  );
};

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default FacebookAuthButton;
