import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { Points } from "@screens/AppScreens/Markers/screens/Points";
import { CreatePoint } from "@screens/AppScreens/Markers/screens/CreatePoint";
import { Point } from "@screens/AppScreens/Markers/screens/Point";

const Stack = createNativeStackNavigator();

export default function PointsInterestStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator>
        <Stack.Screen
          name="Points"
          component={Points}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreatePoint"
          component={CreatePoint}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Point"
          component={Point}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
