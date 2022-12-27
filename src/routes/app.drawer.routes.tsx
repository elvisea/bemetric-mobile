import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DetalhesConta } from "@screens/AppScreens/DetalhesConta";
import { AlterarCliente } from "@screens/AppScreens/AlterarCliente";
import { AtendimentoSuporte } from "@screens/AppScreens/AtendimentoSuporte";

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
          name="DetalhesConta"
          options={{ drawerLabel: "Detalhes da Conta" }}
          component={DetalhesConta}
        />

        <Screen
          name="AlterarCliente"
          options={{ drawerLabel: "Alterar Cliente" }}
          component={AlterarCliente}
        />

        <Screen
          name="AtendimentoSuporte"
          options={{ drawerLabel: "Atendimento de Suporte" }}
          component={AtendimentoSuporte}
        />
      </Navigator>
    </>
  );
}
