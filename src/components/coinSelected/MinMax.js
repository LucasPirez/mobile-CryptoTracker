import react from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";

import useDarkContext from "../../../context/DarkContext";

import { light, dark } from "../../style/colors";

const { width } = Dimensions.get("window");

export default function MinMax({ minMax }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  return (
    <View style={[styles.container, { backgroundColor: lightDark.background }]}>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 12, opacity: 0.5, color: lightDark.letters }}>
          Change
        </Text>
        <Text style={[styles.textChange, { color: lightDark.letters }]}>
          34.4%
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 12, opacity: 0.5, color: lightDark.letters }}>
          Low
        </Text>
        <Text style={[styles.textChange, { color: lightDark.letters }]}>
          {minMax.min1 > 0.9 ? minMax.min1.toFixed(2) : minMax.min1.toFixed(5)}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 12, opacity: 0.5, color: lightDark.letters }}>
          Hight
        </Text>
        <Text style={[styles.textChange, { color: lightDark.letters }]}>
          {minMax.max1 > 0.9 ? minMax.max1.toFixed(2) : minMax.max1.toFixed(5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 40,
  },

  textChange: {
    fontWeight: "600",
  },
});
