import { useState, useContext, createContext, useMemo } from "react";

export const DarkAppContext = createContext(null);

export const DarkContextProvider = ({ children }) => {
  const [switchValue, setSwitchValue] = useState(false);

  const data = { switchValue, setSwitchValue };

  return (
    <DarkAppContext.Provider value={data}>{children}</DarkAppContext.Provider>
  );
};

function useDarkContext() {
  const context = useContext(DarkAppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}
export default useDarkContext;
