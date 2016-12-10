import React, {PropTypes} from 'react';

const Duck = (props) => {
  console.log('props', props);
  return (
    <div>Duck</div>
  );
};

Duck.propTypes = {};

export default Duck;
