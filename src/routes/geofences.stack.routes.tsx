import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { Geofences } from "@screens/AppScreens/Markers/Geofences";
import { CreateGeofence } from "@screens/AppScreens/Markers/CreateGeofence";
import { UpdateGeofences } from "@screens/AppScreens/Markers/UpdateGeofences";

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
          name="UpdateGeofences"
          component={UpdateGeofences}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
