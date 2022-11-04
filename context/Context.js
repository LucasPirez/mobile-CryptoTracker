import { useContext, createContext, useEffect, useState } from "react";
// import { pagination } from "../coingrecoFetch/client";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  console.log("useAppContext");
  const [coinTable, setCoinTable] = useState(null);
  const [number, setNumber] = useState({ a: 1, b: "usd" });
  // const [switchValue, setSwitchValue] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   pagination(number.a, number.b).then((data) => {
  //     setCoinTable(data);
  //     setLoading(false);
  //   });
  // }, [number]);

  const data = {
    coinTable,
    setNumber,
    number,
    setCoinTable,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}
export default useAppContext;
