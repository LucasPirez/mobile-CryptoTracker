import react, { useState, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { addFavorite, grafic } from "../../../coingrecoFetch/client";
import ScreenLoading from "../utilities/Loading";
import RenderGrafic from "./RenderGrafi";

export default function Grafic({ id }) {
  const tamano =
    Dimensions.get("window").width > 500 ? Dimensions.get("window").width : 337;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(new Animated.Value(-56));
  const [width, setWidth] = useState(tamano);

  const dimensionGraph = {
    height: 150,
    margin: { top: 10, right: 10, bottom: 20, left: 25 },
    width: width,
  };

  useEffect(() => {
    grafic(id)
      .then((dato) => dato.json())
      .then((dato) => {
        setData(dato);
      });
  }, []);

  useEffect(() => {
    const widthSubscripcion = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        const size = window.width;
        console.log(size);
        if (size > 500) {
          setWidth(size - 24);
        } else {
          setWidth(337);
        }
      }
    );

    return () => widthSubscripcion?.remove();
  });

  return (
    <View style={styles.animationContainer}>
      <Animated.View
        style={{
          transform: [{ translateY: fadeIn }],
          height: 156,
          position: "relative",
        }}
      >
        {loading && <ScreenLoading size={20} color="red" />}
        {data && (
          <>
            <Text style={styles.textGrafic}>Last 7 Days</Text>
            <RenderGrafic
              data={data.prices}
              fadeIn={fadeIn}
              setLoading={setLoading}
              dimensionGraph={dimensionGraph}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: "flex-end",
    height: 156,
  },
  textGrafic: {
    fontSize: 10,
    position: "absolute",
    color: "#09e",
  },
});
