import react, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../style/colors";
import { shadow1 } from "../../style/shadows";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import AnimatedConfig from "./AnimatedConfig";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function Config() {
  const [config, setConfig] = useState(false);
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  return (
    <>
      {!config ? (
        <TouchableOpacity
          onPress={() => setConfig(!config)}
          style={styles.containerIcon}
        >
          <AwesomeIcon name="list" size={30} color="#09a" />
        </TouchableOpacity>
      ) : (
        <>
          <AnimatedConfig />

          <TouchableOpacity
            onPress={() => setConfig(!config)}
            style={styles.closeWindow}
          ></TouchableOpacity>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerIcon: {
    flex: 1,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  closeWindow: {
    width: "100%",
    height: 1200,
    top: 10,
    right: 0,
    position: "absolute",
    overflow: "visible",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
});
