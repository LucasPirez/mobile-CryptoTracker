import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/home/Home";
import Select from "../components/home/Select";

const Stack = createStackNavigator();

export default function HomeStack() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 100,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.51,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="select"
        component={Select}
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
          gestureEnabled: true,
          gestureResponseDistance: 50,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}
