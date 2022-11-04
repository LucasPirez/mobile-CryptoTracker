import react, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import useAppContext from "../../../context/Context";
import RowTable from "./RowTable";
import { useNavigation, StackActions } from "@react-navigation/native";
import Pagination from "../pagination";
import ScreenLoading from "../utilities/Loading";
import useCoinContext from "../../../context/CoinSelectedContext";
import useDarkContext from "../../../context/DarkContext";
import Search from "../search";
import { light, dark } from "../../style/colors";
import { pagination } from "../../../coingrecoFetch/client";

export default function Table() {
  const ref = useRef();
  const { cambioSelect } = useCoinContext();
  const navigation = useNavigation();
  const { switchValue } = useDarkContext();
  // const { setNumber, number } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [coinTable, setCoinTable] = useState(null);
  const [number, setNumber] = useState(1);

  const lightDark = switchValue ? light : dark;

  const select = (id) => {
    navigation.push("select", { id: id });
  };

  useEffect(() => {
    ref.current?.scrollTo({ y: 0, animated: true });
    setLoading(true);
    pagination(number, cambioSelect).then((data) => {
      setCoinTable(data);
      setLoading(false);
    });
  }, [number, cambioSelect]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
        ref={ref}
      >
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
                style={[
                  styles.subContainer,
                  { borderColor: lightDark.letters },
                ]}
                onPress={() => select(u.id)}
              >
                <RowTable data={u} />
              </TouchableOpacity>
            ))}
          <Pagination number={number} setNumber={setNumber} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 55,
    minHeight: "100%",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff60",
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
