import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  tasks: [],
  periods: [],      
  symptoms: [],      
  wellnessTips: [],  
};

function reducer(state, action) {
  switch (action.type) {
    
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

  
    case "TOGGLE_PERIOD_DAY":
      return {
        ...state,
        periods: state.periods.includes(action.payload)
          ? state.periods.filter((d) => d !== action.payload)
          : [...state.periods, action.payload],
      };

  
    case "ADD_SYMPTOM":
      return {
        ...state,
        symptoms: [...state.symptoms, action.payload],
      };

  
    case "ADD_TIP":
      return {
        ...state,
        wellnessTips: [...state.wellnessTips, action.payload],
      };

    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
