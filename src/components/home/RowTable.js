import react, { lazy } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import useDarkContext from "../../../context/DarkContext";
import AddFavorite from "../favorites/AddFavorite";
import { light, dark } from "../../style/colors";
// const AddFavorite = lazy(() =>
//   import("../../components/favorites/AddFavorite")
// );

export default function RowTable({ data }) {
  const { switchValue } = useDarkContext();

  const lightDark = switchValue ? light : dark;

  return (
    <>
      <View style={styles.view}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <Text style={[styles.text, { color: lightDark.letters }]}>
          {data.name}
        </Text>
      </View>
      <View style={[styles.view, { justifyContent: "center" }]}>
        <Text style={[styles.text, { color: lightDark.letters }]}>
          {data.current_price}
        </Text>
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
          {data.price_change_percentage_24h}%
        </Text>
        <AddFavorite id={data.id} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 7,
    width: "30%",
    alignItems: "center",
  },
  image: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  text: {},
});
