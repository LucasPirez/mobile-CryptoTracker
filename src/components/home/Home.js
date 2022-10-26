import react from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import Table from "./Table";
import { light, dark } from "../../style/colors";
import useDarkContext from "../../../context/DarkContext";
import Search from "../search";

export default function Home() {
  const { switchValue } = useDarkContext();

  const lightDark = switchValue ? light : dark;

  return (
    <>
      <Search style={styles.searchContainer} lightDark={lightDark} />
      <ScrollView
        style={[styles.container, { backgroundColor: lightDark.background }]}
      >
        <Table />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    width: "100%",
  },
  container: {
    padding: 10,
  },
});
