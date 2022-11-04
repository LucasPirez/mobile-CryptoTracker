import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function SelectDays({ setFotterData, fotterData }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: lightDark.reduceBackground },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 1
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(1)}
      >
        <Text style={{ color: lightDark.letters }}>1D</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 3
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(3)}
      >
        <Text style={{ color: lightDark.letters }}>3D</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 7
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.navBackground },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(7)}
      >
        <Text style={{ color: lightDark.letters }}>7D</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 14
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(14)}
      >
        <Text style={{ color: lightDark.letters }}>14D</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 31
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(31)}
      >
        <Text style={{ color: lightDark.letters }}>1M</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 180
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(180)}
      >
        <Text style={{ color: lightDark.letters }}>6M</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subContainer,
          [
            fotterData === 360
              ? [
                  styles.backgroundSelect,
                  { backgroundColor: lightDark.background },
                ]
              : "",
          ],
        ]}
        onPress={() => setFotterData(360)}
      >
        <Text style={{ color: lightDark.letters }}>1Y</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  subContainer: {
    marginHorizontal: 7,
    padding: 3,
    paddingHorizontal: 6,
  },
  backgroundSelect: {
    borderRadius: 4,
  },
});
