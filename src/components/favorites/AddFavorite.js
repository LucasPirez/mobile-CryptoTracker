import react, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import {
  addFavorite,
  deletefavorite,
  isFavorite,
} from "../../../coingrecoFetch/client";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function AddFavorite({ id }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;
  const [favorite, setFavorite] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    isFavorite(id).then((data) => {
      setFavorite(data);
      setRender(false);
    });
  }, [render]);

  const handleFavorite = () => {
    addFavorite(id);
    setRender(true);
  };
  const handleDelete = () => {
    deletefavorite(id);
    setRender(true);
  };

  return (
    <>
      {favorite ? (
        <TouchableOpacity style={styles.icon} onPress={handleDelete}>
          <AwesomeIcon
            name="star"
            size={15}
            style={[{ color: "#c9b536", alignSelf: "flex-end" }]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.icon} onPress={handleFavorite}>
          <AwesomeIcon
            name="star-o"
            size={15}
            style={[{ color: lightDark.letters, alignSelf: "flex-end" }]}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    // position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 30,
    padding: 6,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "stretch",
  },
});
