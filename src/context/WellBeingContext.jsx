import React, { createContext, useState, useContext } from "react";

const WellBeingContext = createContext();

export const WellBeingProvider = ({ children }) => {
  const [periods, setPeriods] = useState([]);


  const addPeriod = (date, cycleLength = 28) => {
    if (!date) return;
    setPeriods((prev) => [
      ...prev,
      { date: new Date(date), cycleLength: Number(cycleLength) }
    ]);
  };
  

  return (
    <WellBeingContext.Provider value={{ periods, addPeriod }}>
      {children}
    </WellBeingContext.Provider>
  );
};

export const useWellBeing = () => useContext(WellBeingContext);
