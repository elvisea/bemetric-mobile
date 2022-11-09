import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";

import { SignIn } from "@screens/AuthScreens/SignIn";
import { NameAndEmail } from "@screens/AuthScreens/NameAndEmail";
import { AcceptTerms } from "@screens/AuthScreens/AcceptTerms";
import { Choose } from "@screens/AuthScreens/Choose";
import { CreateAccount } from "@screens/AuthScreens/CreateAccount";
import { CreatePassword } from "@screens/AuthScreens/CreatePassword";
import { VerifyToken } from "@screens/AuthScreens/VerifyToken";
import { ClientCode } from "@screens/AuthScreens/ClientCode";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="NameAndEmail" component={NameAndEmail} />
        <Screen name="AcceptTerms" component={AcceptTerms} />
        <Screen name="Choose" component={Choose} />
        <Screen name="CreateAccount" component={CreateAccount} />
        <Screen name="CreatePassword" component={CreatePassword} />
        <Screen name="VerifyToken" component={VerifyToken} />
        <Screen name="ClientCode" component={ClientCode} />
      </Navigator>
    </>
  );
}
