import React, {PropTypes} from 'react';
import {Navigation} from 'components';
import {connect} from 'react-redux';
import {container, innerContainer} from './styles.css';

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired
  },
  render () {
    return (
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

function mapStateToProps(state) {
  return {
    isAuthed: state.isAuthed
  };
}

export default connect(mapStateToProps)(MainContainer);
