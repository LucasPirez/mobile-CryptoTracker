import react, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../style/colors";
import { shadow1 } from "../../style/shadows";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import AnimatedConfig from "./AnimatedConfig";

export default function Config() {
  const [config, setConfig] = useState(false);
  return (
    <>
      {!config ? (
        <TouchableOpacity
          onPress={() => setConfig(!config)}
          style={[styles.containerIcon, shadow1]}
        >
          <AwesomeIcon name="list" size={30} color="#09e" />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setConfig(!config)}
            style={styles.closeWindow}
          ></TouchableOpacity>
          <AnimatedConfig />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerIcon: {
    width: 35,
    padding: 5,
    height: 35,
    backgroundColor: "#eee",
  },
  closeWindow: {
    width: "100%",
    height: 1200,
    top: 10,
    right: 0,
    position: "absolute",
    zIndex: 9,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
});
