import * as types from './action-type'

export const setState = (key, value) => {
  return {
    type: types.SET_STATE,
    key,
    value
  }
}

export const setHeader = (key, value) => {
  return {
    type: types.SET_HEADER,
    key,
    value
  }
}

export const setBatchHeader = (value) => {
  return {
    type: types.BATCH_SET_HEADER,
    value
  }
}

export const setBaseObjState = (state, key, value) => {
  return {
    type: types.SET_BASE_OBJ_STATE,
    state,
    key,
    value
  }
}

export const setBaseObj = (state, obj) => {
  return {
    type: types.SET_BASE_OBJ,
    state,
    obj
  }
}
