import auth, {logout} from 'helpers/auth';

/* Action creators */

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';

function authUser (uid) {
  return {
    type: AUTH_USER,
    uid
  };
}

function unauthUser () {
  return {
    type: UNAUTH_USER
  };
}

function fetchingUser () {
  return {
    type: FETCHING_USER
  };
}

function fetchingUserError () {
  return {
    type: FETCHING_USER_ERROR,
    error: 'Error fetching user'
  };
}

function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  };
}

export function fetchAndHandleAuthUser() {
  return function (dispatch) {
    dispatch(fetchingUser());
    return auth().then(user => {
      dispatch(fetchingUserSuccess(user.uid, user, Date.now()));
      dispatch(authUser(user.uid));
    })
      .catch(() => dispatch(fetchingUserError()));
  };
}

export function logoutAndUnauth() {
  return function (dispatch) {
    logout();
    dispatch(unauthUser());
  };
}

/* Reducers */

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
};

export function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      };
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: ''
};

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_USER_SUCCESS:
      return action.user == null
        ? {
          ...state,
          error: '',
          isFetching: false
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action)
        };
    default:
      return state;
  }
}
