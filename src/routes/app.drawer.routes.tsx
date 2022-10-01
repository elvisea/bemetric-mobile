import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabRoutes from './home.tab.routes';

import ProfileScreen from '@screens/AppScreens/Profile';
import ChangeCustomerScreen from '@screens/AppScreens/ChangeCustomer';
import SupportServiceScreen from '@screens/AppScreens/SupportService';

const { Navigator, Screen } = createDrawerNavigator();

export default function AppDrawerRoutes() {
  return (
    <>
      <StatusBar />
      <Navigator>
        {/* <Navigator screenOptions={{ headerShown: false }}> */}
        <Screen
          name="HomeTabRoutes"
          options={{ drawerLabel: "Home" }}
          component={HomeTabRoutes}
        />

        <Screen
          name="ProfileScreen"
          options={{ drawerLabel: "Detalhes da Conta" }}
          component={ProfileScreen}
        />
        <Screen
          name="ChangeCustomerScreen"
          options={{ drawerLabel: "Alterar Cliente" }}
          component={ChangeCustomerScreen}
        />
        <Screen
          name="SupportServiceScreen"
          options={{ drawerLabel: "Atendimento de Suporte" }}
          component={SupportServiceScreen}
        />
      </Navigator>
    </>
  );
}

