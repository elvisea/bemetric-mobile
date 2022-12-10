import * as React from "react";
import { StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { THEME } from "@theme/theme";

import { Equipamento } from "@screens/AppScreens/Equipamento";
import { TelemetriaDados } from "@screens/AppScreens/TelemetriaDados";
import { PeriodoPermanencia } from "@screens/AppScreens/PeriodoPermanencia";
import { Trajeto } from "@screens/AppScreens/Trajeto";
import { TelemetriaDispositivo } from "@screens/AppScreens/TelemetriaDispositivo";

const Tab = createBottomTabNavigator();

export default function DetalhesEquipamentoTabRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Tab.Navigator
        initialRouteName="Equipamento"
        screenOptions={{
          // tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          // tabBarIndicatorStyle: { backgroundColor: "#FFF" },
        }}
      >
        <Tab.Screen
          name="Equipamento"
          component={Equipamento}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="home" color="#FFF" size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="TelemetriaDispositivo"
          component={TelemetriaDispositivo}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="folder" color="#FFF" size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="PeriodoPermanencia"
          component={PeriodoPermanencia}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="location-pin" color="#FFF" size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="Trajeto"
          component={Trajeto}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="bluetooth" color="#FFF" size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="TelemetriaDados"
          component={TelemetriaDados}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="android" color="#FFF" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 50,
    backgroundColor: THEME.colors.blue[700],
  },
});
