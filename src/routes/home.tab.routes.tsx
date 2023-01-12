import * as React from "react";
import { StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { THEME } from "@theme/theme";

import { Equipments } from "@screens/AppScreens/Equipments";
import { Change } from "@screens/AppScreens/Change";
import { Markers } from "@screens/AppScreens/Markers";

import { Include } from "@screens/AppScreens/Include";

const Tab = createBottomTabNavigator();

export default function HomeTabRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />

      <Tab.Navigator
        initialRouteName="Equipments"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
        }}
      >
        <Tab.Screen
          name="Equipments"
          component={Equipments}
          options={{
            tabBarLabel: "Equipamentos",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Include"
          component={Include}
          options={{
            tabBarLabel: "Incluir",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Change"
          component={Change}
          options={{
            tabBarLabel: "Trocar",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sync" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Markers"
          component={Markers}
          options={{
            tabBarLabel: "Marcadores",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="location-pin" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: THEME.fonts.Roboto_400Regular,
  },

  tabBarStyle: {
    paddingBottom: 8,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
  tabBarItemStyle: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
