import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
}

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_SUCCESS':
    case 'LOGIN_SUCCESS':
      
      // Set localstorage item with key "token"
      AsyncStorage.setItem("token", payload.token)

      return {
        isLogin: true,
        user: payload,
      }
    case 'AUTH_ERROR':
    case 'LOGOUT':

      // Remove localstorage item with key "token" 
      AsyncStorage.removeItem("token")

      return {
        isLogin: false,
        user: {},
      }
    default:
      throw new Error();
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}