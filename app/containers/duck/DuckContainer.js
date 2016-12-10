import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Duck} from 'components';

const DuckContainer = React.createClass({
  propTypes: {
    duck: PropTypes.object.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      hideReplyBtn: false,
      hideLikeCount: true
    };
  },
  goToProfile(e) {
    e.preventDefault();
    this.context.router.push('/' + this.props.duck.uid);
  },
  handleClick(e) {
    e.preventDefault();
    this.context.router.push('/duck-detail/' + this.props.duck.duckId);
  },
  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn ? null: this.handleClick}
        {...this.props}
      />
    );
  }
});

function mapStateToProps({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId]
  };
}

export default connect(mapStateToProps)(DuckContainer);
