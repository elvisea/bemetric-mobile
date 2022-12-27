import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import HomeTabRoutes from "./home.tab.routes";
import { DetailsTopTabs } from "./details.top.tabs.routes";
import { TouchableOpacity } from "react-native";

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
            headerShown: true,
            animation: "none",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitleStyle: { color: "#FFF" },
            headerStyle: {
              backgroundColor: THEME.colors.blue[700],
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
}
