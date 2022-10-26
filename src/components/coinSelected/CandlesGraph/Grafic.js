import react, { useState } from "react";
import { Svg } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import RectLine from "./RectLine";
import { scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import useDarkContext from "../../../../context/DarkContext";
import { light, dark } from "../../../style/colors";
import Cuadricula from "../../utilities/Cuadricula";
import useGraficConstans from "../../../hooks/useGraficConstans";
import Pointer from "./Pointer";

export default function Grafic({
  arrObj,
  positionX,
  positionY,
  minMax,
  headerValues,
}) {
  const star = useSharedValue(false);
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const { width, height, margin } = useGraficConstans();
  const SvgAnimated = Animated.createAnimatedComponent(Svg);

  const scaleY = scaleLinear()
    .domain([minMax.min1, minMax.max1])
    .range([height - margin.bottom, margin.top]);

  const scaleBody = scaleLinear()
    .domain([minMax.min0, minMax.max0])
    .range([margin.left, width - margin.left - 5]);

  const dataScale = arrObj.map((u) => {
    return {
      promedio: scaleY((u["maximo"] + u["minimo"]) / 2),
      posX: scaleBody(u["date"]) - 2.5,
      maximo: scaleY(u["maximo"]),
      minimo: scaleY(u["minimo"]),
      open: scaleY(u["open"]),
      close: scaleY(u["close"]),
    };
  });

  const handleGesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      star.value = true;
    },
    onActive: (event, context) => {
      let d;

      dataScale.forEach((u, i) => {
        if (
          i < dataScale.length - 1 &&
          event.x > u["posX"] &&
          event.x < dataScale[i + 1]["posX"]
        ) {
          d = u["promedio"];
          positionX.value = event.x;
          headerValues.value = {
            maximo: u["maximo"],
            minimo: u["minimo"],
            open: u["open"],
            close: u["close"],
          };
        }
      });
      positionY.value = d || 0;
    },
    onEnd: (event) => {
      star.value = false;
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <SvgAnimated style={StyleSheet.absoluteFill}>
          <Cuadricula
            width={width}
            height={height}
            margin={margin}
            minMax={minMax}
          />
          {dataScale.map((u, i) => (
            <RectLine key={i} u={u} long={dataScale.length} />
          ))}
        </SvgAnimated>
      </PanGestureHandler>
      <Pointer positionX={positionX} positionY={positionY} start={star} />
    </>
  );
}
