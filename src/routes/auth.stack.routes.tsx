import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConfirmPassword } from '@screens/AuthScreens/ConfirmPassword';
import { Email } from '@screens/AuthScreens/Email';
import { Name } from '@screens/AuthScreens/Name';
import { Password } from '@screens/AuthScreens/Password';
import { SignIn } from '@screens/AuthScreens/SignIn';

import { THEME } from '@theme/theme';

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Screen name="ConfirmPassword" component={ConfirmPassword} />
        <Screen name="Email" component={Email} />
        <Screen name="Name" component={Name} />
        <Screen name="Password" component={Password} />
        <Screen name="SignIn" component={SignIn} />
      </Navigator>
    </>
  );
}
