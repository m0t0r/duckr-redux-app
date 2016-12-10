import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Feed} from 'components';
import * as feedActionCreators from 'redux/modules/feed';

const FeedContainer = React.createClass({
  propTypes: {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired
  },
  componentDidMount() {
    this.props.setAndHandleFeedListener();
  },
  render() {
    return (
      <Feed newDucksAvailable={this.props.newDucksAvailable}
        isFetching={this.props.isFetching}
        error={this.props.error}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
      />
    );
  }
});

function mapStateToProps({feed}) {
  return {
    isFetching: feed.isFetching,
    error: feed.error,
    newDucksAvailable: feed.newDucksAvailable
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
