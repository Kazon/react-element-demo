import * as types from './action-type'

export const defaultState = {
  globalLoading: false,
  header: {
    left: '',
    center: '',
    right: ''
  },
  location: {
    name: '',
    address: '',
    geohash: '',
    latitude: null,
    longitude: null,
  }
}


export function rootReducer(state = defaultState, action = {}){
  switch(action.type){
    case types.SET_STATE:
      return {
        ...state,
        [action.key]: action.value
      }
    case types.SET_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          [action.key]: action.value
        }
      }
    case types.BATCH_SET_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.header
        }
      }
    case types.SET_BASE_OBJ_STATE:
      return {
        ...state,
        [action.state]: {
          ...state[action.state],
          [action.key]: action.value
        }
      }
    case types.SET_BASE_OBJ:
      return {
        ...state,
        [action.state]: {
          ...state[action.state],
          ...action.obj
        }
      }
    default:
      return state
  }
}