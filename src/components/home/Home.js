import react from "react";

import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Table from "./Table";
import { light, dark } from "../../style/colors";
import useDarkContext from "../../../context/DarkContext";
import Search from "../search";
import Config from "../config";

export default function Home() {
  const { switchValue } = useDarkContext();

  const lightDark = switchValue ? light : dark;

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: lightDark.background }]}
      >
        <View
          style={[
            styles.containerSearch,
            { backgroundColor: lightDark.background },
          ]}
        >
          <Search lightDark={lightDark} />
          <Config />
        </View>
        <Table />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: "row",
    position: "relative",
    overflow: "visible",
    paddingTop: 30,
    height: "auto",
    zIndex: 9,
  },

  container: {
    padding: 10,
  },
});
