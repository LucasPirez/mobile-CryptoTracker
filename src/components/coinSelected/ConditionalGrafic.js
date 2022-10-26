import { TouchableOpacity, StyleSheet } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import useDarkContext from "../../../context/DarkContext";
import { light, dark } from "../../style/colors";

export default function ConditionalGrafic({ candle, setCandle }) {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  return (
    <>
      {candle ? (
        <TouchableOpacity
          onPress={() => setCandle(!candle)}
          style={[
            styles.iconGrafic,
            { backgroundColor: lightDark.reduceBackground },
          ]}
        >
          <AwesomeIcon name="line-chart" style={[{ color: lightDark.blue }]} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setCandle(!candle)}
          style={[
            styles.iconGrafic,
            { backgroundColor: lightDark.reduceBackground },
          ]}
        >
          <AwesomeIcon name="bar-chart" style={[{ color: lightDark.blue }]} />
        </TouchableOpacity>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  iconGrafic: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
});
