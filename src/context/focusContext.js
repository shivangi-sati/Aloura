import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FocusContext = createContext();

const initialState = {
  tasks: [],
  filterTag: '',
  energyLog: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: uuidv4(), ...action.payload }],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'SET_FILTER_TAG':
      return {
        ...state,
        filterTag: action.payload,
      };
    case 'LOG_ENERGY':
      return {
        ...state,
        energyLog: { ...state.energyLog, [action.payload.date]: action.payload.level },
      };
    default:
      return state;
  }
};

export const FocusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FocusContext.Provider value={{ state, dispatch }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => useContext(FocusContext);