import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { oneCoin } from "../../../coingrecoFetch/client";
import { useNavigation } from "@react-navigation/native";
import useDarkContext from "../../../context/DarkContext";
import CoinSelected from "../coinSelected";
import { light, dark } from "../../style/colors";

export default function Select(props) {
  const { id } = props.route.params;
  const [coin, setCoin] = useState(null);
  const navigation = useNavigation();
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  useEffect(() => {
    oneCoin(id).then((data) => {
      setCoin(data);
    });
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={([styles.back], { backgroundColor: lightDark.background })}
      >
        <Text style={[styles.textBack, { color: lightDark.letters }]}>
          back
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        {coin && <CoinSelected data={coin} />}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    marginTop: 20,
    justifyContent: "center",
    width: "100%",
    height: 30,
  },
  textBack: {
    marginLeft: 20,
  },
});
