import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Home from "../components/home/Home";
import Favorites from "../components/favorites/Favorites";
import Select from "../components/home/Select";
import HomeStack from "./HomeStack";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import useDarkContext from "../../context/DarkContext";
import { light, dark } from "../style/colors";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  const { switchValue } = useDarkContext();
  const lightDark = switchValue ? light : dark;

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: lightDark.navBackground }}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "inicio",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "HomeStack":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "bars";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={[styles.icon]} />;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: "#eed",
  },
});
