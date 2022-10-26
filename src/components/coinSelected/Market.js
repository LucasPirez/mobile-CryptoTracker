import { StyleSheet, View, Text } from "react-native";
import react from "react";
import useDarkContext from "../../../context/DarkContext";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import { light, dark } from "../../style/colors";

export default function Market({ data }) {
  const { market_data } = data;
  const {
    price_change_percentage_24h,
    price_change_percentage_7d,
    price_change_percentage_14d,
  } = market_data;
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={{ color: lightDark.letters }}>MARKET</Text>
        <Text style={{ color: lightDark.letters }}>
          Rank:#{data.market_cap_rank}
        </Text>
        <Text style={{ color: lightDark.letters }}>
          cap: ${market_data.market_cap.usd}
        </Text>
        <Text style={{ color: lightDark.letters }}>
          24hvol: ${market_data.total_volume.usd}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={{ color: lightDark.letters }}>CHANGE</Text>
        {price_change_percentage_24h > 0 ? (
          <Text style={{ color: lightDark.green }}>
            24H:{"  "}
            <AwesomeIcon name="caret-up" />
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        ) : (
          <Text style={{ color: lightDark.red }}>
            24H:{"  "}
            <AwesomeIcon name="caret-down" />
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        )}
        {price_change_percentage_7d > 0 ? (
          <Text style={{ color: lightDark.green }}>
            {"  "}
            7D:{"  "}
            <AwesomeIcon name="caret-up" />
            {price_change_percentage_7d.toFixed(2)}%
          </Text>
        ) : (
          <Text style={{ color: lightDark.red }}>
            {"  "}
            7D:{"  "}
            <AwesomeIcon name="caret-down" />
            {price_change_percentage_7d.toFixed(2)}%
          </Text>
        )}
        {price_change_percentage_14d > 0 ? (
          <Text style={{ color: lightDark.green }}>
            14D:{"  "}
            <AwesomeIcon name="caret-up" />
            {price_change_percentage_14d.toFixed(2)}%
          </Text>
        ) : (
          <Text style={{ color: lightDark.red }}>
            14D:{"  "}
            <AwesomeIcon name="caret-down" />
            {price_change_percentage_14d.toFixed(2)}%
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },

  subContainer: {
    width: "50%",
    padding: 15,
    borderWidth: 0.3,
    borderColor: "#08d",
    margin: 3,
    borderRadius: 15,
  },
});
