import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CoinContextProvider } from "./context/CoinSelectedContext";
import { DarkContextProvider } from "./context/DarkContext";
import AppNavigation from "./src/pages/AppNavigation";

export default function App() {
  return (
    <>
      <DarkContextProvider>
        <CoinContextProvider>
          <AppNavigation />
        </CoinContextProvider>
      </DarkContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
