import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AccountDetails } from "@screens/AppScreens/AccountDetails";
import { ChangeClient } from "@screens/AppScreens/ChangeClient";
import { SupportService } from "@screens/AppScreens/SupportService";

import { THEME } from "@theme/theme";
import HomeStackRoutes from "./home.stack.routes";

const { Navigator, Screen } = createDrawerNavigator();

export default function AppDrawerRoutes() {
  return (
    <>
      <StatusBar />

      <Navigator
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: { color: THEME.colors.white },
          drawerContentStyle: {
            backgroundColor: THEME.colors.blue[700],
          },
        }}
      >
        <Screen
          name="HomeTabRoutes"
          options={{ drawerLabel: "Home" }}
          component={HomeStackRoutes}
        />

        <Screen
          name="AccountDetails"
          options={{ drawerLabel: "Detalhes da Conta" }}
          component={AccountDetails}
        />

        <Screen
          name="ChangeClient"
          options={{ drawerLabel: "Alterar Cliente" }}
          component={ChangeClient}
        />

        <Screen
          name="SupportService"
          options={{ drawerLabel: "Atendimento de Suporte" }}
          component={SupportService}
        />
      </Navigator>
    </>
  );
}
