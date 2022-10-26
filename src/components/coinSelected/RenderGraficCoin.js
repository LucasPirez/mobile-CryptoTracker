import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  EventSubscriptionVendor,
} from "react-native";
import useDarkContext from "../../../context/DarkContext";
import * as shape from "d3-shape";
import { useSharedValue } from "react-native-reanimated";
import { parse } from "react-native-redash";
import { scaleLinear } from "d3-scale";
import AnimatedGrafic from "./AnimatedGrafic";
import HeaderGrafic from "./HeaderGrafic";
import MinMax from "./MinMax";
import ConditionalGrafic from "./ConditionalGrafic";
import useBitcoinData from "../../hooks/useBitcoinData";

import useGraficConstans from "../../hooks/useGraficConstans";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RenderGraficCoin({
  data,
  fotterData,
  candle,
  setCandle,
}) {
  const { width, height, margin } = useGraficConstans();
  const { lightDark } = useDarkContext();
  const priceY = useSharedValue(0);
  const fechaX = useSharedValue(0);
  const bitcoinCompareValue = useSharedValue(0);
  const [bitcoin, setBitcoin] = useState(false);
  const { setCoinCompare, bitcoinData, setTime, parseBitcoin, minMaxBitcoin } =
    useBitcoinData();

  useEffect(() => {
    (async () => {
      const storageBitcoin = await AsyncStorage.getItem("bitcoin");

      if (!storageBitcoin) {
        await AsyncStorage.setItem(
          "bitcoin",
          JSON.stringify({ dale: bitcoin })
        );
      } else {
        await AsyncStorage.setItem(
          "bitcoin",
          JSON.stringify({ dale: bitcoin })
        );
      }
    })();

    if (bitcoin) {
      setTime(fotterData);
      setCoinCompare(data);
    }
  }, [bitcoin]);

  useEffect(() => {
    (async () => {
      const storageBitcoin = await AsyncStorage.getItem("bitcoin");
      const result = await JSON.parse(storageBitcoin);

      console.log(result["dale"]);
      if (storageBitcoin) {
        setBitcoin(result["dale"]);
      }
    })();
  }, []);

  const minMax = (d) => {
    return {
      max0: Math.max(...d.map((u) => u[0])),
      min0: Math.min(...d.map((u) => u[0])),
      max1: Math.max(...d.map((u) => u[1])),
      min1: Math.min(...d.map((u) => u[1])),
    };
  };

  const scaleY = scaleLinear()
    .domain([minMax(data).min1, minMax(data).max1])
    .range([height - margin.bottom, margin.top]);

  const scaleBody = scaleLinear()
    .domain([minMax(data).min0, minMax(data).max0])
    .range([margin.left, width - margin.left]);

  const d = shape
    .line()
    .x((p) => scaleBody(p[0]))
    .y((p) => scaleY(p[1]))
    .curve(shape.curveNatural)(data);

  return (
    <>
      <HeaderGrafic
        priceY={priceY}
        minMax={minMax(data)}
        fechaX={fechaX}
        bitcoinCompareValue={bitcoinCompareValue}
        minMaxBitcoin={minMaxBitcoin}
      />
      <View style={{ width: width, height: height, position: "relative" }}>
        <AnimatedGrafic
          d={d}
          parseD={parse(d)}
          priceY={priceY}
          fechaX={fechaX}
          minMax={minMax(data)}
          data={data}
          fotterData={fotterData}
          bitcoinData={bitcoinData}
          setBitcoin={setBitcoin}
          bitcoin={bitcoin}
          parseBitcoin={parseBitcoin}
          bitcoinCompareValue={bitcoinCompareValue}
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
        <MinMax minMax={minMax(data)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pos: {
    position: "relative",
  },
});
