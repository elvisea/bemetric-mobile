import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { Geofences } from "@screens/AppScreens/Markers/screens/Geofences";
import { CreateGeofence } from "@screens/AppScreens/Markers/screens/CreateGeofence";
import { Geofence } from "@screens/AppScreens/Markers/screens/Geofence";

const Stack = createNativeStackNavigator();

export default function GeofencesStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator>
        <Stack.Screen
          name="Geofences"
          component={Geofences}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateGeofence"
          component={CreateGeofence}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Geofence"
          component={Geofence}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
