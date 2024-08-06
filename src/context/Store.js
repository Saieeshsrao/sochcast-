// src/context/Store.js
import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const initialState = {
    shows: [],
    // ... other initial state properties
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Current state in StoreProvider:", state);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};