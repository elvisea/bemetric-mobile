import * as React from "react";
import { StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { THEME } from "@theme/theme";

import { Equipamentos } from "@screens/AppScreens/Equipamentos";
import { Incluir } from "@screens/AppScreens/Incluir";
import { Trocar } from "@screens/AppScreens/Trocar";
import { Marcadores } from "@screens/AppScreens/Marcadores";

const Tab = createBottomTabNavigator();

export default function HomeTabRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Tab.Navigator
        initialRouteName="Equipamentos"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
        }}
      >
        <Tab.Screen
          name="Equipamentos"
          component={Equipamentos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Incluir"
          component={Incluir}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Trocar"
          component={Trocar}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sync" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Marcadores"
          component={Marcadores}
          options={{
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
