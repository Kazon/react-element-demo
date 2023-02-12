import store from '../store';
import { setState } from '../store/action';

export const showLoading = loadingInstance => {
  if(!loadingInstance){
    store.dispatch(setState('globalLoading', true))
    return true
  }
  return false
}

export const hideLoading = loadingInstance => {
  if(loadingInstance){
    store.dispatch(setState('globalLoading', false))
    return false
  }
  return true
}