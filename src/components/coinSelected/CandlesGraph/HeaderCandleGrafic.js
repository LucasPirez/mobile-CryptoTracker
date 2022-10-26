import react from "react";
import { Text, View, StyleSheet } from "react-native";
import { ReText } from "react-native-redash";
import {
  useDerivedValue,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import useGraficConstans from "../../../hooks/useGraficConstans";
import useDarkContext from "../../../../context/DarkContext";

import { light, dark } from "../../../style/colors";

export default function HeaderCandleGrafic({
  positionX,
  minMax,
  headerValues,
}) {
  const { margin, height, width } = useGraficConstans();
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  const trimN = (n) => {
    "worklet";
    if (n < 9) {
      return +n.toFixed(5);
    } else {
      return +n.toFixed(2);
    }
  };

  const h = useDerivedValue(() => {
    return (
      trimN(
        interpolate(
          headerValues.value.maximo,
          [height - margin.bottom, margin.top],
          [minMax.min1, minMax.max1]
        )
      ).toLocaleString("en-US") || 0
    );
  });
  const l = useDerivedValue(() => {
    return (
      trimN(
        interpolate(
          headerValues.value.minimo,
          [height - margin.bottom, margin.top],
          [minMax.min1, minMax.max1]
        )
      ).toLocaleString("en-US") || 0
    );
  });
  console.log(l.value);
  const o = useDerivedValue(() => {
    return (
      trimN(
        interpolate(
          headerValues.value.open,
          [height - margin.bottom, margin.top],
          [minMax.min1, minMax.max1]
        )
      ).toLocaleString("en-US") || 0
    );
  });
  const c = useDerivedValue(() => {
    return (
      trimN(
        interpolate(
          headerValues.value.close,
          [height - margin.bottom, margin.top],
          [minMax.min1, minMax.max1]
        )
      ).toLocaleString("en-US") || 0
    );
  });

  const interDate =
    useDerivedValue(() => {
      const h = interpolate(
        positionX.value,
        [margin.left, width - margin.left - 5],
        [minMax.min0, minMax.max0]
      );

      return new Date(h).toLocaleDateString("en-US");
    }) || 0;

  return (
    <View style={styles.container}>
      <ReText
        text={interDate}
        style={[styles.textfecha, { color: lightDark.letters }]}
      />
      <View style={[styles.price, { width: width }]}>
        <View style={styles.containerPrices}>
          <Text style={[styles.letraPrice, { color: lightDark.letters }]}>
            o:
          </Text>
          <ReText
            text={o}
            style={[styles.textPrice, { color: lightDark.letters }]}
          />
        </View>
        <View style={styles.containerPrices}>
          <Text style={[styles.letraPrice, { color: lightDark.letters }]}>
            h:
          </Text>
          <ReText
            text={h}
            style={[styles.textPrice, { color: lightDark.letters }]}
          />
        </View>
        <View style={styles.containerPrices}>
          <Text style={[styles.letraPrice, { color: lightDark.letters }]}>
            l:
          </Text>
          <ReText
            text={l}
            style={[styles.textPrice, { color: lightDark.letters }]}
          />
        </View>
        <View style={styles.containerPrices}>
          <Text style={[styles.letraPrice, { color: lightDark.letters }]}>
            c:
          </Text>
          <ReText
            text={c}
            style={[styles.textPrice, { color: lightDark.letters }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "space-around",
  },
  price: {
    height: 27,

    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  containerPrices: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    maxWidth: 110,
    height: 25,
    justifyContent: "space-around",
  },
  letraPrice: {
    marginBottom: 3,
  },
  textPrice: {
    marginLeft: -12,
    fontSize: 12,
    height: 14,
    opacity: 0.85,
  },
  textfecha: {
    alignSelf: "flex-end",
    fontSize: 12,
    opacity: 0.8,
    marginRight: 15,
  },
});
