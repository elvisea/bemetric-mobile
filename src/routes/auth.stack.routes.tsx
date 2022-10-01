import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@screens/AuthScreens/SignIn';
import Welcome from '@screens/AuthScreens/Welcome';
import StepName from '@screens/AuthScreens/StepName';
import StepEmail from '@screens/AuthScreens/StepEmail';
import StepPassword from '@screens/AuthScreens/StepPassword';
import StepConfirmPassword from '@screens/AuthScreens/StepConfirmPassword';

import { THEME } from '@theme/theme';

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="signIn"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Screen name="signIn" component={SignIn} />
        <Screen name="welcome" component={Welcome} />
        <Screen name="stepName" component={StepName} />
        <Screen name="stepEmail" component={StepEmail} />
        <Screen name="stepPassword" component={StepPassword} />
        <Screen name="stepConfirmPassword" component={StepConfirmPassword} />
      </Navigator>
    </>
  );
}
