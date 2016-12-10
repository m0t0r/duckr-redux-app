import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api';

const FETCHING_LIKES = 'FETCHING_LIKES';
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR';
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS';
export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

/* Action creators */

function addLike(duckId) {
  return {
    type: ADD_LIKE,
    duckId
  };
}

function removeLike(duckId) {
  return {
    type: REMOVE_LIKE,
    duckId
  };
}

function fetchingLikes() {
  return {
    type: FETCHING_LIKES
  };
}

function fetchingLikesError() {
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Fetching likes error'
  };
}

function fetchingLikesSuccess(likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes
  };
}

export function addAndHandleLike(duckId, e) {
  e.stopPropagation();
  return function (dispatch, getState) {
    dispatch(addLike(duckId));

    const uid = getState().users.authedId;

    return Promise.all([
      saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId)
    ]).catch(err => {
      console.warn('Error in adding a like, rolling back', err);
      dispatch(removeLike(duckId));
    });
  };
}

export function handleDeleteLike(duckId, e) {
  e.stopPropagation();
  return function (dispatch, getState) {
    dispatch(removeLike(duckId));

    const uid = getState().users.authedId;

    return Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumberOfLikes(duckId)
    ]).catch(err => {
      console.warn('Error in removing a like, rolling back', err);
      dispatch(addLike(duckId));
    });
  };
}

export function setUsersLikes() {
  return function (dispatch, getState) {
    const uid = getState().users.authedId;
    dispatch(fetchingLikes());
    return fetchUsersLikes(uid)
      .then(likes => dispatch(fetchingLikesSuccess(likes)))
      .catch(() => dispatch(fetchingLikesError()));
  };
}

/* Reducers */

const initialState = {
  isFetching: false,
  error: ''
};

export default function usersLikes(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ''
      };
    case ADD_LIKE:
      return {
        ...state,
        [action.duckId]: true
      };
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter(duckId => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current];
          return prev
        }, {});
    default:
      return state;
  }
}