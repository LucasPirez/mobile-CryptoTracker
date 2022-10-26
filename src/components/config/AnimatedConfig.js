import react, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
  Switch,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import useAppContext from "../../../context/Context";
import useDarkContext from "../../../context/DarkContext";
import useCoinContext from "../../../context/CoinSelectedContext";

export default function AnimatedConfig() {
  const [fadeIn, setFadeIn] = useState(new Animated.Value(170));
  const { number, setNumber } = useAppContext();
  const { cambio, cambioSelect, setCambioSelect } = useCoinContext();
  const { switchValue, setSwitchValue } = useDarkContext();

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSelect = (itemValue) => {
    setCambioSelect(itemValue);
    setNumber({ ...number, b: itemValue });
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: fadeIn }] }]}
    >
      <TouchableOpacity style={styles.containerSelect}>
        <Picker
          selectedValue={cambioSelect}
          onValueChange={(itemValue, itemIndex) => handleSelect(itemValue)}
          itemStyle={{
            backgroundColor: "grey",
            color: "blue",
            fontFamily: "Ebrima",
            fontSize: 17,
          }}
        >
          {cambio.map((u) => (
            <Picker.Item key={u} label={u} value={u} />
          ))}
        </Picker>
      </TouchableOpacity>
      <Text>Dark Mode</Text>
      <Switch
        style={styles.switch}
        value={switchValue}
        trackColor={{ false: "#555", true: "#eee" }}
        thumbColor="#09e"
        onValueChange={() => setSwitchValue(!switchValue)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -20,
    right: -30,
    width: 270,
    minHeight: 300,
    zIndex: 9,
    margin: 30,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  containerSelect: {
    margin: 7,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 14,
    width: 260,
    height: 50,
    backgroundColor: "#666",
    color: "#eef",
  },
  switch: {
    color: "red",
    // width: 160,
    // height: 80,
    // backgroundColor: "rgba(250,0,0,0.5)",
  },
});
