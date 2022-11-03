import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Equipamento } from "@screens/AppScreens/Equipamento";
import { TelemetriaDados } from "@screens/AppScreens/TelemetriaDados";
import { PeriodoPermanencia } from "@screens/AppScreens/PeriodoPermanencia";
import { Trajeto } from "@screens/AppScreens/Trajeto";
import { TelemetriaDispositivo } from "@screens/AppScreens/TelemetriaDispositivo";

import { THEME } from "@theme/theme";

const TopTab = createMaterialTopTabNavigator();

export default function EquipamentoTabRoutes() {
  return (
    <TopTab.Navigator
      initialRouteName="Equipamento"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: { backgroundColor: "#FFF" },
      }}
    >
      <TopTab.Screen
        name="Equipamento"
        component={Equipamento}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" color="#FFF" size={25} />
          ),
        }}
      />

      <TopTab.Screen
        name="TelemetriaDispositivo"
        component={TelemetriaDispositivo}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="folder" color="#FFF" size={25} />
          ),
        }}
      />

      <TopTab.Screen
        name="PeriodoPermanencia"
        component={PeriodoPermanencia}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="location-pin" color="#FFF" size={25} />
          ),
        }}
      />

      <TopTab.Screen
        name="Trajeto"
        component={Trajeto}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="bluetooth" color="#FFF" size={25} />
          ),
        }}
      />

      <TopTab.Screen
        name="TelemetriaDados"
        component={TelemetriaDados}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="android" color="#FFF" size={25} />
          ),
        }}
      />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 50,
    backgroundColor: THEME.colors.blue[700],
  },
});
