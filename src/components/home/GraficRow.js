import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as shape from "d3-shape";
import { scaleLinear, scaleTime } from "d3-scale";
import { Svg, Path } from "react-native-svg";
import PathGraph from "../utilities/PathGraph";
import { light, dark } from "../../style/colors";
import useDarkContext from "../../../context/DarkContext";
import useGraficConstans from "../../hooks/useGraficConstans";

export default function GraficRow({ data }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const { width } = useGraficConstans();

  const colorGraph =
    data[0] <= data[data.length - 1] ? lightDark.green : lightDark.red;

  const x1 = scaleLinear()
    .domain([0, data.length])
    .range([0, width * 0.22]);

  const y1 = scaleLinear()
    .domain([Math.min(...data), Math.max(...data)])
    .range([28, 0]);

  const d = shape
    .line()
    .x((d, i) => x1(i))
    .y((d) => y1(d))
    .curve(shape.curveNatural)(data);

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Path d={d} stroke={colorGraph} strokeWidth={1} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",

    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    height: 28,
    alignSelf: "baseline",
    marginBottom: 0.8,
    marginLeft: "6.5%",
  },
});
