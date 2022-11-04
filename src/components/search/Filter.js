import react, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ScreenLoading from "../utilities/Loading";

export default function Filter({ text, list, close, setClose }) {
  const [filtro, setFiltro] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [close, setClose] = useState(false);
  const navigation = useNavigation();
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  useEffect(() => {
    let arr = [];
    if (text.length === 0) {
      setFiltro(null);
    }
    if (text.length > 2) {
      setClose(true);
      setLoading(true);
      list.filter((u) => {
        if (u[1].toString().includes(text.toLowerCase())) {
          return arr.push(u[1]);
        }
      });

      arr = arr.sort((a, k) => {
        return a.length - k.length;
      });
      setLoading(false);
      setFiltro(arr);
    } else {
      setClose(false);
    }
  }, [text]);

  // console.log("filtro " + filtro);
  const handleSelect = (id) => {
    navigation.push("select", { id: id });
  };
  console.log(filtro);
  return (
    <>
      {close && (
        <>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setClose(false)}
          ></TouchableOpacity>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ScreenLoading color={"red"} size={15} />
            </View>
          ) : (
            <ScrollView
              style={[
                styles.container,
                { backgroundColor: lightDark.background },
              ]}
            >
              {filtro &&
                filtro.map((u) => (
                  <TouchableOpacity
                    key={u}
                    style={[
                      styles.subContainer,
                      { backgroundColor: lightDark.background },
                    ]}
                    onPress={() => handleSelect(u)}
                  >
                    <AwesomeIcon
                      name="search"
                      color={lightDark.letters}
                      style={styles.icon}
                      size={14}
                    />
                    <Text
                      style={{
                        color: lightDark.letters,
                        marginLeft: 16,
                        paddingVertical: 8,
                        width: 180,
                      }}
                    >
                      {u}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    width: 500,
    height: 600,
    backgroundColor: "transparent",
    position: "absolute",
  },
  container: {
    width: "100%",
    height: 250,
    position: "absolute",
    left: 20,
    top: 40,
  },
  subContainer: {
    flexDirection: "row",
    width: 200,
    margin: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  icon: {
    width: 14,
    height: 14,
    marginLeft: 90,
    alignSelf: "center",
  },
  loaderContainer: {
    height: 60,
    width: "100%",
    position: "relative",
  },
});
