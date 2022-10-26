import react, { useState, useEffect } from "react";
import { grafic } from "../../coingrecoFetch/client";
import { scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import { parse } from "react-native-redash";
import useGraficConstans from "./useGraficConstans";

export default function useBitcoinData() {
  const [time, setTime] = useState(null);
  const [bitcoinData, setBitcoinData] = useState(null);
  const [coinCompare, setCoinCompare] = useState(null);
  const { width, height, margin } = useGraficConstans();
  const [pricesArr, setPricesArr] = useState(null);

  const minMaxBitcoin = (d) => {
    return {
      max0: Math.max(...d.map((u) => u[0])),
      min0: Math.min(...d.map((u) => u[0])),
      max1: Math.max(...d.map((u) => u[1])),
      min1: Math.min(...d.map((u) => u[1])),
    };
  };

  useEffect(() => {
    if (coinCompare) {
      grafic("bitcoin", time)
        .then((dato) => dato.json())
        .then((dato) => {
          const { prices } = dato;
          let newArr = [];

          for (let i = 0; i < coinCompare.length; i++) {
            newArr.push([coinCompare[i][0], coinCompare[i][1] / prices[i][1]]);
          }
          setPricesArr(newArr);
          const scaleYBitcoin = scaleLinear()
            .domain([minMaxBitcoin(newArr).min1, minMaxBitcoin(newArr).max1])
            .range([height - margin.bottom, margin.top]);

          const scaleXBitcoin = scaleLinear()
            .domain([minMaxBitcoin(newArr).min0, minMaxBitcoin(newArr).max0])
            .range([margin.left, width - margin.left]);

          const dBitcoin = shape
            .line()
            .x((p) => scaleXBitcoin(p[0]))
            .y((p) => scaleYBitcoin(p[1]))
            .curve(shape.curveNatural)(newArr);

          setBitcoinData(dBitcoin);
        });
    }
  }, [coinCompare, width]);

  return {
    bitcoinData,
    parseBitcoin: (bitcoinData && parse(bitcoinData)) || null,
    setCoinCompare,
    setTime,
    minMaxBitcoin: pricesArr && minMaxBitcoin(pricesArr),
  };
}
