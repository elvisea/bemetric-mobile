import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EquipamentScreen } from '@screens/AppScreens/Home/Equipament';

import { THEME } from '@theme/theme';
import EquipamentsTopTabRoutes from './equipaments.tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="EquipamentScreen"
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <Screen name="EquipamentScreen" component={EquipamentScreen} />
        <Screen name="EquipamentsTopTabRoutes" component={EquipamentsTopTabRoutes} />
      </Navigator>
    </>
  );
}
