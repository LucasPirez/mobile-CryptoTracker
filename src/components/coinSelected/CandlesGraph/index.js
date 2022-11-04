import react, { useState, useEffect } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import useGraficConstans from "../../../hooks/useGraficConstans";
import ConditionalGrafic from "../ConditionalGrafic";
import FotterGrafic from "../SelectDays";
import HeaderGrafic from "../HeaderGrafic";
import MinMax from "../MinMax";
import Grafic from "./Grafic";
import HeaderCandleGrafic from "./HeaderCandleGrafic";

export default function CandlesGraph({ data, candle, setCandle, fotterData }) {
  const { width, height, margin } = useGraficConstans();
  const divisor =
    fotterData === 360 || fotterData === 180
      ? 42
      : fotterData === 31 || fotterData === 14
      ? 102
      : fotterData === 3
      ? 20
      : 42;

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const headerValues = useSharedValue({
    minimo: 0,
    maximo: 0,
    open: 0,
    close: 0,
  });

  const arrObj = () => {
    const long = Math.round(data.length / divisor);
    let newarr = [];
    // let count = 0;

    for (let i = 0; i < data.length - long + 1; i += long) {
      let arr = [];
      for (let j = i; j < i + long; j++) {
        arr.push(data[j][1]);
      }

      let minimo = Math.min(...arr);
      let maximo = Math.max(...arr);

      let close = arr[arr.length - 1];

      if (newarr.length === 0) {
        newarr.push({
          date: data[i][0],
          minimo,
          maximo,
          open: arr[0],
          close,
        });
      } else {
        newarr.push({
          date: data[i][0],
          minimo,
          maximo,
          open: newarr[newarr.length - 1]["close"],
          close,
        });
      }
    }

    return newarr;
  };

  // console.log(arrObj());""

  const minMax = {
    max1: Math.max(...arrObj().map((u) => u["maximo"])),
    min1: Math.min(...arrObj().map((u) => u["minimo"])),
    max0: Math.max(...arrObj().map((u) => u["date"])),
    min0: Math.min(...arrObj().map((u) => u["date"])),
  };

  return (
    <>
      <HeaderCandleGrafic
        positionX={positionX}
        minMax={minMax}
        headerValues={headerValues}
      />
      <View style={{ width: width, height: height }}>
        <Grafic
          arrObj={arrObj()}
          positionX={positionX}
          minMax={minMax}
          positionY={positionY}
          headerValues={headerValues}
        />
      </View>
      <View
        style={{
          width: width,
          height: 70,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ConditionalGrafic candle={candle} setCandle={setCandle} />
        <MinMax minMax={minMax} />
      </View>
    </>
  );
}
