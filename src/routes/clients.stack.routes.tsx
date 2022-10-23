import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Clients } from '@screens/AuthScreens/Clients';

import { THEME } from '@theme/theme';

const { Navigator, Screen } = createNativeStackNavigator();

export default function ClientsStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="Clients"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Screen name="Clients" component={Clients} />
      </Navigator>
    </>
  );
}
