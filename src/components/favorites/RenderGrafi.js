import react, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Animated } from "react-native";
import * as shape from "d3-shape";
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

import Cursor from "./Cursor";
import useDarkContext from "../../../context/DarkContext";
import GaficLine from "./GaficLine";
import Cuadricula from "../utilities/Cuadricula";
import { light, dark } from "../../style/colors";
import AnimatedRect from "../utilities/AnimatedRect";
import PathGraph from "../utilities/PathGraph";
import { useSharedValue } from "react-native-reanimated";

export default function RenderGrafic({
  data,
  fadeIn,
  setLoading,
  dimensionGraph,
}) {
  const { width, height, margin } = dimensionGraph;
  const anima = useSharedValue(true);

  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const [textPrice, setTextPrice] = useState({
    time: null,
    price: null,
    positionX: null,
    positionY: null,
  });

  const minMax = {
    max0: Math.max(...data.map((u) => u[0])),
    min0: Math.min(...data.map((u) => u[0])),
    max1: Math.max(...data.map((u) => u[1])),
    min1: Math.min(...data.map((u) => u[1])),
  };

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setLoading(false);
  }, []);

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <PathGraph
        datos={data}
        width={width}
        height={height}
        margin={margin}
        color={lightDark.lineGrafic}
      />

      <AnimatedRect width={width} height={height} />

      <Cuadricula
        width={width}
        height={height}
        margin={margin}
        minMax={minMax}
      />
    </Svg>

    // <Svg width={width} height={height}>
    //   {/* {data.map((u, i) => (
    //     <GaficLine
    //       key={u[0]}
    //       u={u}
    //       u1={i < data.length && data[i + 1]}
    //       scaleY={scaleY}
    //       scaleBody={scaleBody}
    //       setTextPrice={setTextPrice}
    //     />
    //   ))} */}
    // {/* <Defs>
    //   <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
    //     <Stop
    //       offset="0%"
    //       stopOpacity={0.1}
    //       stopColor={lightDark.lineGrafic}
    //     />

    //     <Stop offset="80%" stopColor="#eee" />
    //   </LinearGradient>
    // </Defs> */}

    //
    //   {/* {textPrice.time && (
    //     <>
    //       <Rect
    //         y={textPrice.positionY - 15}
    //         x={textPrice.positionX}
    //         width={90}
    //         height={25}
    //         fill={lightDark.background}
    //       />
    //       <Text
    //         y={textPrice.positionY - 5}
    //         x={textPrice.positionX + 10}
    //         fill={lightDark.letters}
    //         fontSize={10}
    //         fontWeight={400}
    //         fillRule="back"
    //       >
    //         {textPrice.price.toFixed(2)} usd
    //       </Text>
    //       <Text
    //         y={textPrice.positionY + 5}
    //         x={textPrice.positionX + 10}
    //         fill={lightDark.letters}
    //         background="red"
    //         fontSize={10}
    //         fontWeight={400}
    //       >
    //         {new Date(textPrice.time).toLocaleDateString()}
    //       </Text>
    //       <Circle
    //         cx={textPrice.positionX}
    //         cy={textPrice.positionY}
    //         r={2.4}
    //         fill={lightDark.letters}o
    //       />
    //     </>
    //   )} */}

    // </Svg>
  );
}
