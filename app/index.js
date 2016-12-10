import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import users from './redux/modules/users';
import thunk from 'redux-thunk';

const store = createStore(users, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));
