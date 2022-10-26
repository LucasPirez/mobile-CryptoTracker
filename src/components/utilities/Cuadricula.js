import { Path, G, Text } from "react-native-svg";
import {
  useSharedValue,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function Cuadricula({ width, height, margin, minMax }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const milMonh = new Date().getTime() - 2629750000;

  // 2629750000;
  const d = height / 5;
  const w = (width - margin.left) / 6;
  return (
    <>
      {Array(6)
        .fill()
        .map((u, i) => (
          <G key={i}>
            <Path d={` M${0},${d * i} h5 z`} stroke="red" strokeWidth={1} />
            <Path
              d={` M${0},${d * i} h${width - margin.left} z`}
              stroke={lightDark.lineGrafic}
              strokeWidth={1}
              opacity={0.2}
            />

            <Text
              x={0}
              y={d * i - 4}
              fontSize={8}
              strokeWidth={0.7}
              fill={lightDark.letters}
            >
              {interpolate(
                d * i,
                [height - margin.bottom, margin.top],
                [minMax.min1, minMax.max1]
              ) > 0.09
                ? interpolate(
                    d * i,
                    [height - margin.bottom, margin.top],
                    [minMax.min1, minMax.max1]
                  ).toFixed(2)
                : interpolate(
                    d * i,
                    [height - margin.bottom, margin.top],
                    [minMax.min1, minMax.max1]
                  ).toFixed(6)}
            </Text>
          </G>
        ))}
      {Array(6)
        .fill()
        .map((u, i) => (
          <G key={i * 4}>
            <Path
              d={` M${w * i},0 v${height} z`}
              stroke={lightDark.lineGrafic}
              strokeWidth={1}
              opacity={0.2}
            />
            <Path
              d={` M${w * i},${height} v-5 z`}
              stroke={lightDark.red}
              strokeWidth={1}
            />
            <Text
              x={w * i + 1}
              y={height - 1.4}
              fontSize={8}
              fill={lightDark.letters}
            >
              {i > 0 &&
                (new Date(
                  interpolate(
                    w * i,
                    [margin.left, width - margin.left],
                    [minMax.min0, minMax.max0]
                  )
                ) < milMonh
                  ? new Date(
                      interpolate(
                        w * i,
                        [margin.left, width - margin.left],
                        [minMax.min0, minMax.max0]
                      )
                    ).toLocaleDateString()
                  : new Date(
                      interpolate(
                        w * i,
                        [margin.left, width - margin.left],
                        [minMax.min0, minMax.max0]
                      )
                    ).getDate())}
            </Text>
          </G>
        ))}
    </>
  );
}
