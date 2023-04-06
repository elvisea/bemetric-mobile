import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { PointsInterest } from "@screens/AppScreens/Markers/PointsInterest";
import { CreatePointsInterest } from "@screens/AppScreens/Markers/CreatePointsInterest";
import { UpdatePointsInterest } from "@screens/AppScreens/Markers/UpdatePointsInterest";

const Stack = createNativeStackNavigator();

export default function PointsInterestStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator>
        <Stack.Screen
          name="PointsInterest"
          component={PointsInterest}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreatePointsInterest"
          component={CreatePointsInterest}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpdatePointsInterest"
          component={UpdatePointsInterest}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
