import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppContextProvider } from "./context/Context";
import { CoinContextProvider } from "./context/CoinSelectedContext";
import { DarkContextProvider } from "./context/DarkContext";
import AppNavigation from "./src/pages/AppNavigation";

export default function App() {
  return (
    <>
      <DarkContextProvider>
        <AppContextProvider>
          <CoinContextProvider>
            <AppNavigation />
          </CoinContextProvider>
        </AppContextProvider>
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
