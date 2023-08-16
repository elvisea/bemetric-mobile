import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import DetailingScreen from "@screens/AppScreens/Notifications/DetailingScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export default function NotificationDetailingStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="DetailingScreen"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="DetailingScreen" component={DetailingScreen} />
      </Navigator>
    </>
  );
}
