import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DuckDetails} from 'components';
import * as duckActionCreators from 'redux/modules/ducks';
import * as likeCountActionCreators from 'redux/modules/like-count'
import * as repliesActionCreators from 'redux/modules/replies';

const DuckDetailsContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
  },
  componentDidMount() {
    this.props.initLikeFetch(this.props.duckId);

    if(this.props.duckAlreadyFetched) {
      this.props.removeFetching();
    } else {
      this.props.fetchAndHandleDuck(this.props.duckId);
    }
  },
  render() {
    return (
      <DuckDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
});

function mapStateToProps({users, ducks, likeCount}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {...duckActionCreators, ...likeCountActionCreators, ...repliesActionCreators},
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckDetailsContainer);
