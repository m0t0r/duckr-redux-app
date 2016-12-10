import React from 'react';
import ReactDOM from 'react-dom';
import getRoutes from './config/routes';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {checkIfAuthed} from './helpers/auth';
import * as reducers from 'redux/modules';

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

function checkAuth(nextState, replace) {
  if(store.getState().users.isFetching) {
    return;
  }

  const isAuthed = checkIfAuthed(store);
  const nextPathName = nextState.location.pathname;

  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed) {
      replace('/feed');
    }
  } else if (!isAuthed) {
    replace('/auth');
  }
}

ReactDOM.render(<Provider store={store}>{getRoutes(checkAuth)}</Provider>, document.getElementById('app'));
