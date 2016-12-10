
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK';
const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS';
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS';
const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR';

/*Action creators*/

function fetchingUsersDucks(uid) {
  return {
    type: FETCHING_USER_DUCKS,
    uid
  };
}

function fetchingUsersDucksError(error) {
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

/* Reducer */

const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: []
};

export default function usersDuck(state = initialUsersDuckState, action) {
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

function userDucks(state = initialState, action) {
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