import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTabRoutes from "./home.tab.routes";

import { DetalhesConta } from "@screens/AppScreens/DetalhesConta";
import { AlterarCliente } from "@screens/AppScreens/AlterarCliente";
import { AtendimentoSuporte } from "@screens/AppScreens/AtendimentoSuporte";

const { Navigator, Screen } = createDrawerNavigator();

export default function AppDrawerRoutes() {
  return (
    <>
      <StatusBar />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="HomeTabRoutes"
          options={{ drawerLabel: "Home" }}
          component={HomeTabRoutes}
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
