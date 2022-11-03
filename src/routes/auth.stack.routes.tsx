import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ConfirmPassword } from "@screens/AuthScreens/ConfirmPassword";
import { Email } from "@screens/AuthScreens/Email";
// import { InserirDadosUsuario } from "@screens/AuthScreens/InserirDadosUsuario";
import { Password } from "@screens/AuthScreens/Password";
import { SignIn } from "@screens/AuthScreens/SignIn";

import { THEME } from "@theme/theme";
import { AtivarCodigo } from "@screens/AuthScreens/AtivarCodigo";
import { InserirDadosUsuario } from "@screens/AuthScreens/InserirDadosUsuario";
import { AceitarTermos } from "@screens/AuthScreens/AceitarTermos";
import { InserirDadosClientes } from "@screens/AuthScreens/InserirDadosCliente";
import { InserirTokenCliente } from "@screens/AuthScreens/InserirTokenCliente";
import { NovaContaOuJaExistente } from "@screens/AuthScreens/NovaContaOuJaExistente";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="ConfirmPassword" component={ConfirmPassword} />
        <Screen name="AceitarTermos" component={AceitarTermos} />
        <Screen name="Email" component={Email} />
        <Screen name="InserirDadosUsuario" component={InserirDadosUsuario} />
        <Screen name="InserirDadosCliente" component={InserirDadosClientes} />
        <Screen name="InserirTokenCliente" component={InserirTokenCliente} />
        <Screen name="Password" component={Password} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="AtivarCodigo" component={AtivarCodigo} />
        <Screen name="NovaContaOuJaExistente" component={NovaContaOuJaExistente} />
      </Navigator>
    </>
  );
}
