import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import HomeTabRoutes from "./home.tab.routes";
import { Cabecalho } from "@components/Cabecalho";
import { DetailsTopTabs } from "./details.top.tabs.routes";
import { NotificationsTopTabs } from "./notifications.top.tabs.routes";
import MessagesStackRoutes from "./messages.stack.routes";
import IncludeStackRoutes from "./include.stack.routes";

import { ChartTelemetryData } from "@screens/AppScreens/EquipmentDetails/ChartTelemetryData";
import SyncDataStackRoutes from "./sync.data.stack.routes";

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

        <Stack.Screen
          name="Notifications"
          component={NotificationsTopTabs}
          options={{
            header: () => <Cabecalho />,
            animation: "none",
          }}
        />

        <Stack.Screen
          name="Messages"
          component={MessagesStackRoutes}
          options={{
            headerShown: false,
            animation: "none",
          }}
        />

        <Stack.Screen
          name="Chart"
          component={ChartTelemetryData}
          options={{
            header: () => <Cabecalho hasIcon={false} />,
            animation: "none",
          }}
        />

        <Stack.Screen
          name="IncludeStackRoutes"
          component={IncludeStackRoutes}
          options={{
            animation: "none",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SyncDataStackRoutes"
          component={SyncDataStackRoutes}
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
