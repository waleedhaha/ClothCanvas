import React, { createContext, useState } from 'react';

const OccasionContext = createContext();

export const OccasionProvider = ({ children }) => {
  const [occasions, setOccasions] = useState({});

  const addOccasion = (date, details) => {
    const newOccasions = { ...occasions, [date]: details };
    setOccasions(newOccasions);
  };

  return (
    <OccasionContext.Provider value={{ occasions, addOccasion }}>
      {children}
    </OccasionContext.Provider>
  );
};

export default OccasionContext;
