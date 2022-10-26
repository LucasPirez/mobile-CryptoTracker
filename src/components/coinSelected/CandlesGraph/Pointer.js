import react from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useGraficConstans from "../../../hooks/useGraficConstans";
import useDarkContext from "../../../../context/DarkContext";
import { light, dark } from "../../../style/colors";

export default function Pointer({ positionX, positionY, start }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  const { width, height, margin } = useGraficConstans();

  const circle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value - 3.5,
        },
        {
          translateY: positionY.value - 3.5,
        },
        { scale: withSpring(start.value ? 1 : 0) },
      ],
    };
  });

  const lineY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: positionY.value - 7.5,
        },
        { scale: withSpring(start.value ? 1 : 0) },
      ],
    };
  });

  const lineX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value - 0.5,
        },
        { scale: withSpring(start.value ? 1 : 0) },
      ],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: lightDark.lineGrafic,
            borderWidth: 1,
            borderColor: lightDark.navBackground,
            width: 7,
            height: 7,
            borderRadius: 3.5,
            zIndex: 9,
          },
          circle,
        ]}
      />
      <Animated.View
        style={[
          {
            borderTopColor: lightDark.lineGrafic,
            borderTopWidth: 1,
            borderStyle: "dashed",
            width: width - margin.left,
            height: 1,
            marginBottom: -margin.top + 2,
            opacity: 0.7,
          },
          lineY,
        ]}
      />
      <Animated.View
        style={[
          {
            borderRightColor: lightDark.lineGrafic,
            borderRightWidth: 1,
            borderStyle: "dashed",
            width: 1,
            height: height,
            opacity: 0.8,
          },
          lineX,
        ]}
      />
    </>
  );
}
