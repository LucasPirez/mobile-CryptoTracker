import react, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Picker, PickerProps } from "@react-native-picker/picker";
import AddFavorite from "../favorites/AddFavorite";
import Market from "./Market";
import GraficCoinSelect from "./GraficCoinSelect";
import useDarkContext from "../../../context/DarkContext";
import Cursor from "../favorites/Cursor";
import { light, dark } from "../../style/colors";

export default function CoinSelected({ data }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const [select, setSelect] = useState("usd");
  const [conversion, setConversion] = useState(null);

  useEffect(() => {
    const arr = Object.entries(data.market_data.current_price);

    for (const [val, price] of arr) {
      if (val === select) {
        return setConversion(price);
      }
    }
  }, [select]);

  const handleSelect = (e) => {
    const { value } = e.target;
    const arr = Object.entries(coin.market_data.current_price);
    setSelect(value);
    for (const [val, price] of arr) {
      if (val === value) {
        return setConversion(price);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: lightDark.background }]}>
      <View style={styles.containerHeader}>
        <View style={styles.subContainer}>
          <Image style={styles.logo} source={{ uri: data.image.small }} />
          <Text style={{ color: lightDark.letters }}>{data.name} </Text>
          <Text style={{ color: lightDark.letters }}>
            ({data.symbol.toUpperCase()})
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Picker
            selectedValue={select}
            style={{
              height: 50,
              width: 97,
              color: lightDark.letters,
            }}
            onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}
            dropdownIconColor={lightDark.letters}
          >
            {Object.keys(data.market_data.ath).map((u) => (
              <Picker.Item key={u} label={u} value={u} />
            ))}
          </Picker>
          <Text style={[styles.conversion, { color: lightDark.letters }]}>
            {conversion && conversion}
          </Text>
        </View>
      </View>
      <Market data={data} />
      <GraficCoinSelect id={data.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 15,
    height: 700,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 7,
  },
  conversion: {
    textAlign: "right",
  },
});
