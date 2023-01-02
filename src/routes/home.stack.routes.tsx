import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import HomeTabRoutes from "./home.tab.routes";
import { Cabecalho } from "@components/Cabecalho";
import { DetailsTopTabs } from "./details.top.tabs.routes";

const Stack = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomeTabRoutes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EquipmentDetails"
          component={DetailsTopTabs}
          options={{
            header: () => <Cabecalho />,
            animation: "none",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
