import { useEffect, useState } from "react"
import store from "../store"
import { setBaseObj, setState } from "../store/action"

const storage = window.localStorage
const sessionStorage = window.sessionStorage

export const getLocalKeys = () => Object.keys(window.localStorage)

export const getSessionKeys = () => Object.keys(window.sessionStorage)

export function useSessionStorageWithStore(key, value = null){
  const [curStorge, setCurStorge] = useState(value)
  let isString

  useEffect(() => {
    if(getSessionKeys().includes(key)){
      const val = sessionStorage.getItem(key)
      let setVal = null
      try {
        setVal = JSON.parse(val)
      } catch (error) {
        setVal = val
      } finally {
        setCurStorge(setVal)
      }
    }
  }, [])
  useEffect(() => {
    isString = typeof curStorge == 'string'
    sessionStorage.setItem(key, isString ? curStorge : JSON.stringify(curStorge))
    // sessionStorage.setItem(key, curStorge)
    isString && store.dispatch(setState(key, curStorge))
    !isString && store.dispatch(setBaseObj(key, curStorge))
  }, [curStorge, key])

  return [curStorge, setCurStorge]
}

export function useLocalStorge(key, value = null){
  // if(value) value = JSON.stringify(value)
  const [curStorge, setCurStorge] = useState(value)
  let isString

  useEffect(() => {
    if(getLocalKeys().includes(key)){
      isString && setCurStorge(storage.getItem(key))
      !isString && setCurStorge(JSON.parse(storage.getItem(key)))
    }
  }, [])

  useEffect(() => {
    // storage.setItem(key, JSON.stringify(curStorge))
    isString = typeof curStorge == 'string'
    storage.setItem(key, isString ? curStorge : JSON.stringify(curStorge))
  }, [curStorge, key])
  return [curStorge, setCurStorge]
}

export const clearStorge = () => storage.clear()

export const removeStorge = key => {
  if(getLocalKeys().includes(key)){
    storage.removeItem(key)
  }
}

// export const useJsonState = s => {
//   const [state, setState] = useState(JSON.stringify(s))
//   const [jsonState, setJsonState] = useState(s)
//   useEffect(() => {
//     setJsonState(JSON.parse(state))
//     console.log(JSON.parse(state))
//   }, [state])
//   const setJsonStates = s => {
//     console.log(s, JSON.stringify(s))
//     setState(JSON.stringify(s))
//   }
//   return [jsonState, setJsonStates]
// }
