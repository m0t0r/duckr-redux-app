import React, {PropTypes} from 'react';
import {User} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActionCreators from 'redux/modules/users';
import * as usersDucksActionCreators from 'redux/modules/users-ducks';
import {staleUser, staleDucks} from 'helpers/utils';

const UserContainer = React.createClass({
  propTypes: {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckIds: PropTypes.array.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    fetchAndHandleUsersDucks: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedDucks: PropTypes.number.isRequired
  },
  componentDidMount() {
    const uid = this.props.routeParams.uid;
    // fetch user or users ducks only once and cash after
    if(this.props.noUser || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid);
    }

    if(this.props.noUser || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid);
    }
  },
  render() {
    return (
      <User noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    );
  }
});

function mapStateToProps({users, usersDucks}, props) {
  const user = users[props.routeParams.uid];
  const noUser = typeof user === 'undefined';
  const specificUsersDucks = usersDucks[props.routeParams.uid];

  return {
    name: noUser ? '' : user.info.name,
    noUser: noUser,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...usersActionCreators, ...usersDucksActionCreators}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
