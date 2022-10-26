import react, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Loading from "../utilities/Loading";
import { grafic } from "../../../coingrecoFetch/client";
import FotterGrafic from "./FotterGrafic";
import RenderGraficCoin from "./RenderGraficCoin";
import CandlesGraph from "./CandlesGraph";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function GraficCoinSelect({ id }) {
  const [data, setData] = useState(null);
  const [fotterData, setFotterData] = useState(7);
  const [loading, setLoading] = useState(false);
  const [candle, setCandle] = useState(false);
  const [bitcoinData, setBitcoinData] = useState(null);
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  useEffect(() => {
    setLoading(true);
    grafic(id, fotterData)
      .then((dato) => dato.json())
      .then((dato) => {
        setData(dato);
        setLoading(false);
      });
  }, [fotterData]);

  return (
    <>
      {data && !loading ? (
        !candle ? (
          <RenderGraficCoin
            data={data.prices}
            fotterData={fotterData}
            candle={candle}
            setCandle={setCandle}
          />
        ) : (
          <CandlesGraph
            data={data.prices}
            candle={candle}
            setCandle={setCandle}
            fotterData={fotterData}
          />
        )
      ) : (
        <View
          style={{
            width: "100%",
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading size={40} color={lightDark.red} />
        </View>
      )}

      <FotterGrafic setFotterData={setFotterData} fotterData={fotterData} />
    </>
  );
}
