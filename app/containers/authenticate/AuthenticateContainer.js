import React, {PropTypes} from 'react';
import {Authenticate} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActionCreators from 'redux/modules/users';

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthUser: PropTypes.func.isRequired
  },
  handleAuth () {
    this.props.fetchAndHandleAuthUser();
  },
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    );
  }
});

function mapStateToProps(state) {
  return {
    isFetching: state.isFetching,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
