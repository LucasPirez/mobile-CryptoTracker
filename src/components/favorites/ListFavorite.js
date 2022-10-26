import react, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { deletefavorite } from "../../../coingrecoFetch/client";
import useAppContext from "../../../context/Context";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../style/colors";
import { shadow1 } from "../../style/shadows";
import useCoinContext from "../../../context/CoinSelectedContext";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";
import Grafic from "./Gafic";

export default function ListFavorite({ data, setFavorites, favorites }) {
  const { setCoinChange, coinChange } = useAppContext();
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const [grafic, setGrafic] = useState(false);
  const { cambioSelect } = useCoinContext();

  const handleDelete = () => {
    deletefavorite(data.id)
      .then(() => {
        setFavorites((favorites) => favorites.filter((u) => u !== data.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.containerImage}>
        <View>
          <Image style={styles.image} source={{ uri: data.image.small }} />
          <Text style={{ color: lightDark.letters }}>{data.id}</Text>
        </View>
        <Text style={{ color: lightDark.letters }}>{cambioSelect}</Text>
        <Text style={{ color: lightDark.letters }}>
          {data.market_data.current_price[cambioSelect]}
        </Text>
        <Text
          style={
            (styles.text,
            data.price_change_percentage_24h <= 0
              ? { color: lightDark.red }
              : { color: lightDark.green })
          }
        >
          {data.market_data.price_change_percentage_24h.toFixed(2)}%
        </Text>
        <TouchableOpacity
          style={[
            styles.containerIcon,
            shadow1,
            { backgroundColor: lightDark.reduceBackground },
          ]}
          onPress={handleDelete}
        >
          <AwesomeIcon
            name="remove"
            size={20}
            style={[{ color: lightDark.blue }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGrafic(!grafic)}
          style={[
            styles.containerIcon,
            shadow1,
            { backgroundColor: lightDark.reduceBackground },
          ]}
        >
          <AwesomeIcon
            name="line-chart"
            size={20}
            style={[{ color: lightDark.blue }]}
          />
        </TouchableOpacity>
      </View>
      {grafic && <Grafic id={data.id} />}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    margin: 4,
  },
  containerImage: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    shadow1,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});
