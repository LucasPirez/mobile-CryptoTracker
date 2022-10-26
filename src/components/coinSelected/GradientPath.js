import { Defs, Stop, LinearGradient } from "react-native-svg";

export default function GradientPath({ id }) {
  return (
    <Defs>
      <LinearGradient id={id} x1="50%" y1="20%" x2="10%" y2="100%">
        <Stop offset="0%" stopOpacity={0.1} stopColor="#bcaaaa" />

        <Stop offset="80%" stopColor="pink" stopOpacity={0.1} />
      </LinearGradient>
    </Defs>
  );
}
