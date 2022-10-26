import react, { useState, useEffect } from "react";
import { TextInput, StyleSheet, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lista } from "../../../coingrecoFetch/client";
import Filter from "./Filter";

export default function Search({ lightDark }) {
  const [list, setList] = useState(null);
  const [close, setClose] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    // AsyncStorage.removeItem("listSearch");
    if (!list) {
      AsyncStorage.getItem("listSearch").then((data) => {
        if (data === null) {
          if (text.length > 1) {
            lista().then((u) => {
              const arr = [];

              u.map((u, i) => arr.push([u.id, u.name.toLowerCase()]));
              AsyncStorage.setItem("listSearch", JSON.stringify(arr)).then(
                (d) => {
                  setList(d);
                }
              );
            });
          }
        } else {
          setList(JSON.parse(data));
        }
      });
    }
  }, [text]);

  // console.log(list);/
  const handleChange = (e) => {
    setText(e);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={lightDark.letters}
        value={text}
        placeholder="Search"
        onChangeText={(e) => handleChange(e)}
        onPressIn={() => setClose(true)}
        style={[
          styles.inputContainer,
          { color: lightDark.letters, backgroundColor: lightDark.background },
        ]}
      />
      {list && (
        <Filter text={text} list={list} close={close} setClose={setClose} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputContainer: {
    textAlign: "center",
    marginTop: 25,
    height: 40,
  },
});
