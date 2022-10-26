import react from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { useDerivedValue, interpolate } from "react-native-reanimated";
import { ReText, Vector } from "react-native-redash";
import useDarkContext from "../../../context/DarkContext";
import useGraficConstans from "../../hooks/useGraficConstans";

import { light, dark } from "../../style/colors";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function HeaderGrafic({
  priceY,
  fechaX,
  minMax,
  bitcoinCompareValue,
  minMaxBitcoin,
}) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const { margin, height, width } = useGraficConstans();

  const price = useDerivedValue(() => {
    const h = interpolate(
      priceY.value,
      [height - margin.bottom, margin.top],
      [minMax.min1, minMax.max1]
    );
    if (h < minMax.max1 && h > minMax.min1) {
      if (h > 0.01) {
        return `$ ${h.toFixed(2).toLocaleString("en-US", {
          style: "moneda",
          currency: "USD",
        })}`;
      } else {
        return `$ ${h
          .toFixed(7)
          .toLocaleString("en-US", { style: "moneda", currency: "USD" })}`;
      }
    } else {
      return "";
    }

    return h;
  });

  const priceBitcoin =
    useDerivedValue(() => {
      if (minMaxBitcoin) {
        const h = interpolate(
          bitcoinCompareValue.value,
          [height - margin.bottom, margin.top],
          [minMaxBitcoin.min1, minMaxBitcoin.max1]
        );
        return h.toFixed(5).toLocaleString("en-US");
      }
    }) || 0;

  const fecha = useDerivedValue(() => {
    const f = interpolate(
      fechaX.value,
      [margin.left, width - margin.left],
      [minMax.min0, minMax.max0]
    );

    const m = new Date(f).getMonth();
    const d = new Date(f).getDate().toLocaleString("en-US");
    const y = new Date(f).getFullYear().toLocaleString("en-US");

    return monthNames[m].toLocaleString("en-US") + " " + d + " " + y;
  });

  return (
    <View style={[styles.container, { backgroundColor: lightDark.background }]}>
      <View style={styles.containerPlu}>
        <ReText
          text={priceBitcoin}
          style={[styles.textPrice, { color: lightDark.bitcoin }]}
        />
        <ReText
          text={price}
          style={[styles.textPrice, { color: lightDark.letters }]}
        />
      </View>
      <ReText
        text={fecha}
        style={[styles.textfecha, { color: lightDark.letters }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 95,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 5,
  },
  containerPlu: {
    flexDirection: "row",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 40,
  },
  containerChange: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textChange: {
    fontWeight: "600",
  },
  price: {
    width: 95,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  textPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 7,
  },
  textfecha: {
    fontSize: 12,
    opacity: 0.8,
  },
});
