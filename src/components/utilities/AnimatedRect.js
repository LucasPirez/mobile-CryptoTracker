import react, { useEffect, useState } from "react";
import { Rect } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function AnimatedRect({ width, height, animateRectBool }) {
  const [counter, setCounter] = useState(0);
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const transition = useSharedValue(0);
  const RectAnimated = Animated.createAnimatedComponent(Rect);

  useEffect(() => {
    transition.value = withSequence(
      withTiming(0),
      withTiming(width * 2.5, { duration: 2500 })
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const x = transition.value;

    return {
      x,
    };
  }, []);

  return (
    <>
      <RectAnimated
        y={0}
        width={width}
        animatedProps={animatedProps}
        height={height}
        fill={lightDark.background}
      />
      {animateRectBool && (animateRectBool.value = false)}
    </>
  );
}
