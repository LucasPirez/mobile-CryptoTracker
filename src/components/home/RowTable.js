import react, { lazy } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import GraficRow from "./GraficRow";
import useDarkContext from "../../../context/DarkContext";
import AddFavorite from "../favorites/AddFavorite";
import { light, dark } from "../../style/colors";

export default function RowTable({ data }) {
  const { switchValue } = useDarkContext();

  const lightDark = switchValue ? light : dark;
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={[styles.rank, { color: lightDark.letters }]}>
        {data.market_cap_rank}
      </Text>
      <View style={styles.view}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.containerName}>
          <Text style={[styles.text, { color: lightDark.letters }]}>
            {data.name}
          </Text>
          <Text style={[styles.text, { color: lightDark.bitcoin }]}>
            {data.symbol.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.containerGrafic}>
        <Text style={[styles.text, { color: lightDark.letters }]}>
          ${data.current_price}
        </Text>
        <GraficRow data={data.sparkline_in_7d.price} />
      </View>
      <View style={[styles.view, { justifyContent: "center" }]}>
        <Text
          style={
            (styles.text,
            data.price_change_percentage_24h <= 0
              ? { color: lightDark.red }
              : { color: lightDark.green })
          }
        >
          {data.price_change_percentage_24h.toFixed(2)}%
        </Text>
        <AddFavorite id={data.id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
    minHeight: 53,
    justifyContent: "space-between",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    marginLeft: 7,
    width: "30%",
    alignItems: "center",
  },
  containerName: {
    marginHorizontal: 5,
  },
  rank: {
    position: "absolute",
    bottom: 2,
    left: 2,
    fontSize: 9,
  },
  image: {
    width: 23,
    height: 23,
    marginRight: 5,
    marginLeft: -9,
    alignSelf: "flex-start",
  },
  containerGrafic: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
});
