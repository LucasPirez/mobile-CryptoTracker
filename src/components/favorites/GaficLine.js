import React from "react";
import { ScaleLinear } from "d3-scale";
import useDarkContext from "../../../context/DarkContext";
import {
  Circle,
  G,
  Line,
  Path,
  Svg,
  Stop,
  Text,
  Defs,
  LinearGradient,
} from "react-native-svg";
import { decay, parse } from "react-native-reanimated";

export default function GraficLine({
  u,
  u1,
  i,
  scaleY,
  scaleBody,
  setTextPrice,
}) {
  const { lightDark } = useDarkContext();

  const handlePress = () => {
    setTextPrice({
      time: u[0],
      price: u[1],
      positionX: scaleBody(u[0]),
      positionY: scaleY(u[1]),
    });
  };

  return (
    <>
      {u1 && (
        <>
          {/* <Line
            x1={scaleBody(u[0])}
            y1={scaleY(u[1])}
            x2={scaleBody(u1[0])}
            y2={scaleY(u1[1])}
            stroke={lightDark.lineGrafic}
            strokeWidth={1}
          />
          <Line
            x1={scaleBody(u[0])}
            y1={200}
            x2={scaleBody(u[0])}
            y2={scaleY(u[1])}
            stroke="url(#gradient)"
            strokeWidth={1}
            onPressIn={handlePress}
          /> */}
        </>
      )}
    </>
  );
}
// onPress={() => console.log("hola")}
