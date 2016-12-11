import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Replies} from 'components';
import * as repliesActionCreators from 'redux/modules/replies';
import {staleReplies} from 'helpers/utils';

const RepliesContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      lastUpdated: 0,
      replies: {}
    }
  },
  componentDidMount() {
    if(staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId);
    }
  },
  render() {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        replies={this.props.replies}
        lastUpdated={this.props.lastUpdated}
      />
    );
  }
});

function mapStateToProps(state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {};
  const {lastUpdated, replies} = duckRepliesInfo;

  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer);
