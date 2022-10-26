import react, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useAppContext from "../../../context/Context";
import RowTable from "./RowTable";
import { useNavigation, StackActions } from "@react-navigation/native";
import Pagination from "../pagination";
import ScreenLoading from "../utilities/Loading";
import useCoinContext from "../../../context/CoinSelectedContext";
import useDarkContext from "../../../context/DarkContext";
import Search from "../search";
import { light, dark } from "../../style/colors";

export default function Table() {
  const { cambioSelect } = useCoinContext();
  const navigation = useNavigation();
  const { switchValue } = useDarkContext();
  const { coinTable, setNumber, number, loading } = useAppContext();
  const lightDark = switchValue ? light : dark;

  const select = (id) => {
    navigation.push("select", { id: id });
  };

  return (
    <>
      <Pagination />

      <View style={styles.container}>
        <View style={styles.headerTable}>
          <Text
            style={[
              styles.headerTitle,

              { borderColor: lightDark.letters, color: lightDark.letters },
            ]}
          >
            Crypto
          </Text>

          <Text
            style={[
              styles.headerTitle,
              { borderColor: lightDark.letters, color: lightDark.letters },
            ]}
          >
            {cambioSelect}
          </Text>
          <Text
            style={[
              styles.headerTitle,
              { borderColor: lightDark.letters, color: lightDark.letters },
            ]}
          >
            Change 24h %
          </Text>
        </View>
        {loading && <ScreenLoading size={20} color="red" />}
        {coinTable &&
          coinTable.map((u) => (
            <TouchableOpacity
              key={u.id}
              style={[styles.subContainer, { borderColor: lightDark.letters }]}
              onPress={() => select(u.id)}
            >
              <RowTable data={u} />
            </TouchableOpacity>
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 30,
    borderWidth: 0.5,
  },
  headerTable: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  headerTitle: {
    fontWeight: "600",
    width: "33.3%",
    textAlign: "center",
    borderWidth: 1,
    fontSize: 17,
    padding: 7,
    height: 39,

    alignContent: "center",
  },
});
