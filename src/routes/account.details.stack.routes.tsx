import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { THEME } from "@theme/theme";
import { AccountDetails } from "@screens/AppScreens/AccountDetails";
import { ChangePassword } from "@screens/AppScreens/ChangePassword";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AccountDetailsStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="AccountDetails"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="AccountDetails" component={AccountDetails} />
        <Screen name="ChangePassword" component={ChangePassword} />
      </Navigator>
    </>
  );
}
