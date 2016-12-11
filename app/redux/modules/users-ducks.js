import {fetchUsersDucks} from 'helpers/api';
import {addMultipleDucks} from 'redux/modules/ducks';

const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK';
const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS';
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS';
const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR';

/* Action creators */

function fetchingUsersDucks() {
  return {
    type: FETCHING_USERS_DUCKS
  };
}

function fetchingUsersDucksError() {
  return {
    type: FETCHING_USERS_DUCKS_ERROR,
    error: 'Error fetching users duck ids'
  };
}

function fetchingUsersDucksSuccess(uid, duckIds, lastUpdated) {
  return {
    type: FETCHING_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated
  };
}

export function addSingleUsersDuck(uid, duckId) {
  return {
    type: ADD_SINGLE_USERS_DUCK,
    uid,
    duckId
  };
}

export function fetchAndHandleUsersDucks(uid) {
  return function (dispatch) {
    dispatch(fetchingUsersDucks());
    return fetchUsersDucks(uid)
      .then((ducks) => dispatch(addMultipleDucks(ducks)))
      .then(({ducks}) => {
        dispatch(fetchingUsersDucksSuccess(
          uid,
          Object.keys(ducks).sort((a, b) => ducks[b].timestamp - ducks[a].timestamp),
          Date.now()
        ));
      })
      .catch(() => dispatch(fetchingUsersDucksError()));
  };
}

/* Reducer */

const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: []
};

function usersDuck(state = initialUsersDuckState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId])
      };
    default:
      return state;
  }
}

const initialState = {
  isFetching: true,
  error: ''
};

export default function usersDucks(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds
        }
      };
    case ADD_SINGLE_USERS_DUCK:
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: usersDuck(state[action.uid], action)
      };
    default:
      return state;
  }
}