import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { Bluetooth } from "@screens/AppScreens/IncludeOptions/Bluetooth";
import { QRCode } from "@screens/AppScreens/IncludeOptions/QRCode";
import { SuccessfullyConnected } from "@screens/AppScreens/IncludeOptions/SuccessfullyConnected";
import { ConfigurarConexaoDados } from "@screens/AppScreens/IncludeOptions/ConfigurarConexaoDados";
import { ListaRedes } from "@screens/AppScreens/IncludeOptions/ListaRedes";
import { ConexaoRedesMoveis } from "@screens/AppScreens/IncludeOptions/ConexaoRedesMoveis";
import { ConexaoManual } from "@screens/AppScreens/IncludeOptions/ConexaoManual";
import { EquipamentosDisponiveis } from "@screens/AppScreens/IncludeOptions/EquipamentosDisponiveis";
import { AddEquipment } from "@screens/AppScreens/IncludeOptions/AddEquipment";
import { VincularDispositivo } from "@screens/AppScreens/IncludeOptions/VincularDispositivo";

const { Navigator, Screen } = createNativeStackNavigator();

export default function IncludeStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        <Screen name="Bluetooth" component={Bluetooth} />

        <Screen name="QRCode" component={QRCode} />

        <Screen name="VincularDispositivo" component={VincularDispositivo} />

        <Screen
          name="SuccessfullyConnected"
          component={SuccessfullyConnected}
        />

        <Screen
          name="ConfigurarConexaoDados"
          component={ConfigurarConexaoDados}
        />

        <Screen name="ListaRedes" component={ListaRedes} />

        <Screen name="ConexaoRedesMoveis" component={ConexaoRedesMoveis} />

        <Screen name="ConexaoManual" component={ConexaoManual} />

        <Screen
          name="EquipamentosDisponiveis"
          component={EquipamentosDisponiveis}
        />

        <Screen name="AddEquipment" component={AddEquipment} />
      </Navigator>
    </>
  );
}
