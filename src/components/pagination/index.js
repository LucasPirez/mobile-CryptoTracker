import react, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { shadow1 } from "../../style/shadows";
import { light, dark } from "../../style/colors";
import Config from "../config";

export default function Pagination({ number, setNumber }) {
  const handlePress = (pag) => {
    if (pag === "sum") {
      setNumber(number + 1);
    } else {
      number > 1 && setNumber(number - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => handlePress("res")}>
          <View style={[styles.button, number <= 1 ? { opacity: 0.5 } : ""]}>
            <Text style={styles.text}>PREV</Text>
          </View>
        </TouchableOpacity>

        {number > 3 && (
          <TouchableOpacity onPress={() => setNumber(1)} style={styles.button}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, { backgroundColor: "#09a" }]}>
          <Text style={styles.text}>{number}</Text>
        </TouchableOpacity>
        {number <= 3 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("sum")}
          >
            <Text style={styles.text}>{number + 1}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>99</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("sum")}
        >
          <Text style={styles.text}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "99%",
    minHeight: 60,
    margin: "auto",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    marginRight: 4,
  },
  text: {
    color: "#eef",
  },
  button: {
    width: 50,
    height: 40,
    backgroundColor: "#555",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  containerIcon: {
    alignItems: "center",

    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});
