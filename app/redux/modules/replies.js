import {posReply} from 'helpers/api';

const ADD_REPLY = 'ADD_REPLY';
const REMOVE_REPLY = 'REMOVE_REPLY';
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS';
const FETCHING_REPLIES = 'FETCHING_REPLIES';
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR';
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR';

/* Action creators */

function addReply(duckId, reply) {
  return {
    type: ADD_REPLY,
    duckId,
    reply
  }
}

function addReplyError() {
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply'
  }
}


function removeReply(duckId, replyId) {
  return {
    type: REMOVE_REPLY,
    duckId,
    replyId
  }
}

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES,
  }
}

function fetchingRepliesError () {
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies',
  }
}

function fetchingRepliesSuccess (duckId, replies) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    duckId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleReply (duckId, reply) {
  return function (dispatch) {
    const {replyWithId, replyPromise} = posReply(duckId, reply);

    dispatch(addReply(duckId, replyWithId));
    replyPromise.catch(() => {
      dispatch(removeReply(duckId, replyWithId.replyId));
      dispatch(addReplyError());
    });
  };
}

/* Reducers */

const initialReplyState = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: ''
};

function duckReplies(state = initialReplyState, action) {
  switch (action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply
      };
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: null
      };
    default:
      return state;
  }
}

const initialDuckState = {
  lastUpdated: Date.now(),
  replies: {}
};

function repliesAndLastUpdated(state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      };
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: duckReplies(state.replies, action)
      };
    default:
      return state;
  }
}

const initialState = {
  isFetching: true,
  error: ''
};

export default function replies(state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action)
      };
    default:
      return state;
  }
}
