import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MarkersTopTabsRoutes } from "./markers.top.tabs.routes";

import { THEME } from "@theme/theme";
import { Cabecalho } from "@components/Cabecalho";

const Stack = createNativeStackNavigator();

export default function MarkersStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator>
        <Stack.Screen
          name="MarkersTopTabsRoutes"
          component={MarkersTopTabsRoutes}
          options={{ header: () => <Cabecalho hasIcon={false} /> }}
        />
      </Stack.Navigator>
    </>
  );
}
