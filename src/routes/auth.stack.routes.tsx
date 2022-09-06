import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/AuthScreens/SignIn";
import StepName from "../screens/AuthScreens/CreateAnAccount/StepName";
import StepEmail from "../screens/AuthScreens/CreateAnAccount/StepEmail";
import StepPassword from "../screens/AuthScreens/CreateAnAccount/StepPassword";
import StepConfirmPassword from "../screens/AuthScreens/CreateAnAccount/StepConfirmPassword";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStackRoutes() {
  return (
    <>
      <Navigator
        initialRouteName="signIn"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Screen name="signIn" component={SignIn} />
        <Screen name="stepName" component={StepName} />
        <Screen name="stepEmail" component={StepEmail} />
        <Screen name="stepPassword" component={StepPassword} />
        <Screen name="stepConfirmPassword" component={StepConfirmPassword} />
      </Navigator>
    </>
  );
}
