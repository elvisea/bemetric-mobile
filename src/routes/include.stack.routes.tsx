import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { Bluetooth } from "@screens/AppScreens/IncludeOptions/Bluetooth";
import { QRCode } from "@screens/AppScreens/IncludeOptions/QRCode";
import { SuccessfullyConnected } from "@screens/AppScreens/IncludeOptions/SuccessfullyConnected";
import { ConfigureConnection } from "@screens/AppScreens/IncludeOptions/ConfigureConnection";
import { WiFi } from "@screens/AppScreens/IncludeOptions/WiFi";
import { ConexaoRedesMoveis } from "@screens/AppScreens/IncludeOptions/ConexaoRedesMoveis";
import { ManualConnection } from "@screens/AppScreens/IncludeOptions/ManualConnection";
import { ChooseEquipment } from "@screens/AppScreens/IncludeOptions/ChooseEquipment";
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

        <Screen name="ConfigureConnection" component={ConfigureConnection} />

        <Screen name="WiFi" component={WiFi} />

        <Screen name="ConexaoRedesMoveis" component={ConexaoRedesMoveis} />

        <Screen name="ManualConnection" component={ManualConnection} />

        <Screen name="ChooseEquipment" component={ChooseEquipment} />

        <Screen name="AddEquipment" component={AddEquipment} />
      </Navigator>
    </>
  );
}
