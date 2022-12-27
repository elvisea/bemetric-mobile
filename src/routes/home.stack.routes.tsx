import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import HomeTabRoutes from "./home.tab.routes";
import { EquipmentDetails } from "@screens/AppScreens/EquipmentDetails";

const Stack = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={HomeTabRoutes} />

        <Stack.Screen name="EquipmentDetails" component={EquipmentDetails} />
      </Stack.Navigator>
    </>
  );
}
