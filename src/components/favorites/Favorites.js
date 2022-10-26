import react, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getFavorite, oneCoin } from "../../../coingrecoFetch/client";
import RowTable from "../home/RowTable";
import ListFavorite from "./ListFavorite";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";
import { shadow1 } from "../../style/shadows";

export default function Favorites() {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const [favorites, setFavorites] = useState(null);
  const [renderFavorites, setRenderFavorites] = useState([]);
  const [render, setRender] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFavorites(null);
      (async () => {
        const response = await getFavorite();
        setFavorites(response);
      })();
      setRender(false);
    }, [])
  );

  useEffect(() => {
    console.log("hola");
    if (favorites) {
      setRenderFavorites((renderFavorites) => []);
      favorites.map((u) => {
        oneCoin(u)
          .then((data) => {
            setRenderFavorites((renderFavorites) => [...renderFavorites, data]);
          })
          .catch((error) => {
            console.log(error);
            6;
          });
      });
    }
  }, [favorites]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100%",
        width: "100%",
        padding: 10,
        backgroundColor: lightDark.reduceBackground,
      }}
    >
      <Text style={[styles.title, { color: lightDark.letters }]}>
        Favorites List
      </Text>

      {favorites &&
        renderFavorites.map((u) => (
          <View
            key={u.id + Math.random()}
            style={[
              styles.subContainer,
              shadow1,
              { backgroundColor: lightDark.background },
            ]}
          >
            <ListFavorite
              data={u}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          </View>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
  subContainer: {
    width: "98%",
    minHeight: 120,
    height: "auto",
    padding: 10,
    margin: 5,
    borderRadius: 6,
  },
});
