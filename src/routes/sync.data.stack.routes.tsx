import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { ExportarDados } from "@screens/AppScreens/ExportarDados";
import { ColetarDados } from "@screens/AppScreens/ColetarDados";
import { SincronizarDados } from "@screens/AppScreens/SincronizarDados";

const { Navigator, Screen } = createNativeStackNavigator();

export default function SyncDataStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />

      <Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        <Screen name="ExportarDados" component={ExportarDados} />
        <Screen name="ColetarDados" component={ColetarDados} />
        <Screen name="SincronizarDados" component={SincronizarDados} />
      </Navigator>
    </>
  );
}
