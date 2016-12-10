import React, {PropTypes} from 'react';
import {Navigation} from 'components';
import {connect} from 'react-redux';
import {container, innerContainer} from './styles.css';
import {bindActionCreators} from 'redux';
import * as userActionCreators from 'redux/modules/users';
import {formatUserInfo} from 'helpers/utils';
import {firebaseAuth} from 'config/constants';

const MainContainer = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid);

        this.props.authUser(user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());

        if (this.props.location.pathname === '/' || this.props.location.pathname === '/auth') {
          this.context.router.replace('feed');
        }
      } else {
        this.props.removeFetchingUser();
      }
    });
  },
  render () {
    return this.props.isFetching
    ? null
    : (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

MainContainer.propTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps({users}) {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
