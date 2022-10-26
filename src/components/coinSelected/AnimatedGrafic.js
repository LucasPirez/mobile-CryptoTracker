import React, { lazy, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import GradientPath from "./GradientPath";
import * as shape from "d3-shape";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";
import { Rect, Path, Svg, Text } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Cuadricula from "../utilities/Cuadricula";
import AnimatedRect from "../utilities/AnimatedRect";
import Pointer from "./CandlesGraph/Pointer";
import useGraficConstans from "../../hooks/useGraficConstans";

export default function AnimatedGrafic({
  d,
  parseD,
  priceY,
  fechaX,
  minMax,
  data,
  fotterData,
  bitcoinData,
  setBitcoin,
  bitcoin,
  parseBitcoin,
  bitcoinCompareValue,
}) {
  const priceMostrar = useSharedValue();
  const star = useSharedValue(false);
  const [animate, setAnimate] = useState(true);
  const bitcoinUse = useSharedValue(0);
  const current = useSharedValue(0);

  const parseDd = useSharedValue(0);
  const animateRectBool = useSharedValue(true);
  const SvgAnimated = Animated.createAnimatedComponent(Svg);
  const { width, height, margin } = useGraficConstans();

  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  const handleGesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      star.value = true;
    },
    onActive: (event, context) => {
      fechaX.value = event.x;

      priceY.value = getYForX(parseD, fechaX.value) || 0;
      if (bitcoin && parseBitcoin) {
        bitcoinCompareValue.value = getYForX(parseBitcoin, fechaX.value) || 0;
      }
    },
    onEnd: (event) => {
      star.value = false;
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <SvgAnimated
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: lightDark.background },
          ]}
        >
          <Rect
            x={0}
            y={0}
            width={42}
            height={27}
            fill={lightDark.reduceBackground}
            onPress={() => setBitcoin(!bitcoin)}
          />

          <Text x={10} y={20} fill={lightDark.bitcoin}>
            BTC
          </Text>
          {bitcoin && bitcoinData && (
            <Path
              d={`${bitcoinData}L ${
                width - margin.left
              } ${height} L 0 ${height} `}
              stroke={lightDark.bitcoin}
              strokeWidth={1}
            />
          )}
          <Path
            d={`${d}L ${width - margin.left} ${height} L 0 ${height} `}
            stroke={lightDark.lineGrafic}
            strokeWidth={1}
            fill="url(#gradient)"
          />
          {AnimatedRect.value && (
            <AnimatedRect
              width={width}
              height={height}
              bitcoinData={bitcoinData}
              animateRectBool={animateRectBool}
            />
          )}
          <Cuadricula
            width={width}
            height={height}
            margin={margin}
            minMax={minMax}
          />
          <GradientPath id={"gradient"} />
        </SvgAnimated>
      </PanGestureHandler>
      <Pointer positionX={fechaX} positionY={priceY} start={star} />
    </>
  );
}
