import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  getRelativeCoords,
  useAnimatedRef,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const TOUCH_SIZE = 200;
const { width } = Dimensions.get("window");
const white = "white";

export default function Cursor({ d, width, marginL, height }) {
  const r = 4;
  const borderWidth = 2;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const SvgAnimated = Animated.createAnimatedComponent(Svg);

  // const velocityX = new useSharedValue(0);
  // const state = new Value(State.UNDETERMINED);

  // const cx = clamp(withDecay(translationX, state, velocityX), 0, 300);
  // const path = createPath(d);
  // const length = interpolateNode(cx, {
  //   inputRange: [0, 300],
  //   outputRange: [0, path.totalLength],
  // });

  // const { y, x } = getRelativeCoords(path, length);
  // const translateX = sub(x, TOUCH_SIZE / 2);
  // const translateY = sub(y, TOUCH_SIZE / 2);

  // ...

  const gesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      console.log(event);
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });
  const t = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gesture}>
      <Animated.View
        style={[
          { backgroundColor: "red", fill: "red", width: 120, height: 120 },
          t,
        ]}
      />
    </PanGestureHandler>
    // <SvgAnimated width={width} height={height}></SvgAnimated>
    // <Path
    //   d={`${d}L ${width - marginL} ${height} L 0 ${height}`}
    //   stroke="red"
    //   strokeWidth={0.7}
    //   fill="url(#gradient)"
    // />
  );
}
