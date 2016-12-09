import React from 'react';
import ReactDOM from 'react-dom';

const Main = React.createClass({
  render() {
    return (
      <div>React is ready to go!</div >
    );
  }
});

ReactDOM.render(<Main/>, document.getElementById('app'));
