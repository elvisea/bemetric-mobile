import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Equipamentos } from "@screens/AppScreens/Equipamentos";

import { THEME } from "@theme/theme";
import EquipamentoTabRoutes from "./equipamento.tab.routes";

const Stack = createNativeStackNavigator();

export default function EquipamentosStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Stack.Navigator
        initialRouteName="Equipamentos"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen
          name="EquipamentosScreen"
          options={{ title: "Equipamentos" }}
          component={Equipamentos}
        />

        <Stack.Screen
          name="EquipamentoTabRoutes"
          component={EquipamentoTabRoutes}
        />
      </Stack.Navigator>
    </>
  );
}
