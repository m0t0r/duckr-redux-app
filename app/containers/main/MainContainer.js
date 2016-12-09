import React, {PropTypes} from 'react';
import {Navigation} from 'components';
import {container, innerContainer} from './styles.css';

const MainContainer = React.createClass({
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={false}/>
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

export default MainContainer;
