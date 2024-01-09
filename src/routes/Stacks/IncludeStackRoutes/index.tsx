import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { screens } from "./screens";

const { Navigator, Screen } = createNativeStackNavigator();

export default function IncludeStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        {screens.map((screen) => (
          <Screen
            key={screen.key}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Navigator>
    </>
  );
}
