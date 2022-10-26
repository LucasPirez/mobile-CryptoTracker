import { Rect, Line, Text } from "react-native-svg";
import useDarkContext from "../../../../context/DarkContext";
import { light, dark } from "../../../style/colors";
import Animated from "react-native-reanimated";
import useGraficConstans from "../../../hooks/useGraficConstans";

export default function RectLine({ u, long }) {
  const { width: size } = useGraficConstans();

  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  const RectAnimated = Animated.createAnimatedComponent(Rect);
  const LineAnimated = Animated.createAnimatedComponent(Line);
  const ancho = long > 70 ? 2 : long < 25 ? 6.5 : 4;
  const marginCandles = size > 460 ? ancho * 2 : ancho;

  const mayor = u["open"] < u["close"] ? u["open"] : u["close"];
  const color =
    u["open"] - u["close"] > 0 ? lightDark.candleGreen : lightDark.candleRed;

  return (
    <>
      <RectAnimated
        x={u["posX"]}
        y={mayor}
        width={marginCandles}
        height={Math.abs(u["open"] - u["close"])}
        fill={color}
      />

      <LineAnimated
        x1={u["posX"] + marginCandles / 2}
        y1={u["maximo"]}
        x2={u["posX"] + marginCandles / 2}
        y2={u["minimo"]}
        stroke={color}
        strokeWidth={0.6}
      />
    </>
  );
}
