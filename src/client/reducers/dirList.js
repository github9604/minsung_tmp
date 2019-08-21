import * as types from '../actions/ActionTypes';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  },
  remove: {
    status: 'INIT',
    error: -1
  }
};

export default function dirList(state = initialState, action) {
  switch (action.type) {
    case types.DIR_POST:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'WAITING',
          error: -1
        }
      };
    case types.DIR_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'SUCCESS'
        }
      };
    case types.DIR_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'FAILURE',
          error: action.error
        }
      };
    case types.DIR_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      };
    case types.DIR_LIST_SUCCESS:
      if (action.isInitial) {
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data
          }
        }
      } else {
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: [...action.data]
          }
        }
      }
    case types.DIR_REMOVE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'WAITING',
          error: -1
        }
      };
    case types.DIR_REMOVE_SUCCESS:
      let removeBefore = state.list.data.slice(0, action.index);
      let removeAfter = state.list.data.slice(action.index + 1);
      console.log("removeBefore" + removeBefore);
      return {
        ...state,
        remove: {
          ...state.remove,
          statsu: 'SUCCESS'
        },
        list: {
          ...state.list,
          data: [...removeBefore, ...removeAfter]
        }
      };
    case types.DIR_REMOVE_FAILURE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'FAILURE',
          error: action.error
        }
      }
      return state;
    default:
      return state;
  }
}