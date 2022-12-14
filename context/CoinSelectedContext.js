import react, { useState, useEffect, useContext, createContext } from "react";

const cambio = [
  "aed",
  "ars",
  "bch",
  "bdt",
  "bhd",
  "bmd",
  "bnb",
  "brl",
  "btc",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "dot",
  "eos",
  "eth",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "ltc",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "usd",
  "vef",
  "vnd",
  "xag",
  "xau",
  "xdr",
  "xlm",
  "xrp",
  "yfi",
  "zar",
  "bits",
  "link",
  "sats",
];

export const CoinContext = createContext(null);

export const CoinContextProvider = ({ children }) => {
  console.log("selectedContext");
  const [cam, setCam] = useState([
    "aed",
    "ars",
    "bch",
    "bdt",
    "bhd",
    "bmd",
    "bnb",
    "brl",
    "btc",
    "cad",
    "chf",
    "clp",
    "cny",
    "czk",
    "dkk",
    "dot",
    "eos",
    "eth",
    "eur",
    "gbp",
    "hkd",
    "huf",
    "idr",
    "ils",
    "inr",
    "jpy",
    "krw",
    "kwd",
    "lkr",
    "ltc",
    "mmk",
    "mxn",
    "myr",
    "ngn",
    "nok",
    "nzd",
    "php",
    "pkr",
    "pln",
    "rub",
    "sar",
    "sek",
    "sgd",
    "thb",
    "try",
    "twd",
    "uah",
    "usd",
    "vef",
    "vnd",
    "xag",
    "xau",
    "xdr",
    "xlm",
    "xrp",
    "yfi",
    "zar",
    "bits",
    "link",
    "sats",
  ]);
  const [cambioSelect, setCambioSelect] = useState("usd");

  const data = {
    cambio,
    cambioSelect,
    setCambioSelect,
  };
  return <CoinContext.Provider value={data}>{children}</CoinContext.Provider>;
};

function useCoinContext() {
  const context = useContext(CoinContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}
export default useCoinContext;
