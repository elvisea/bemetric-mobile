import * as React from 'react';
import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { THEME } from '@theme/theme';

import EquipamentScreen from '@screens/AppScreens/Home/Equipament';
import IncludeScreen from '@screens/AppScreens/Home/Include';
import ExchangeScreen from '@screens/AppScreens/Home/Exchange';
import BookmarksScreen from '@screens/AppScreens/Home/Bookmarks';

const { Navigator, Screen } = createBottomTabNavigator();

export default function HomeTabRoutes() {
  return (
    <>
      <StatusBar backgroundColor={THEME.colors.blue[700]} />
      <Navigator
        initialRouteName="Equipament"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Screen
          name="Equipament"
          component={EquipamentScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Include"
          component={IncludeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Exchange"
          component={ExchangeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="location-pin" color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    marginBottom: 10,
  },
  tabBarIconStyle: {
    marginBottom: 4,
  },
  tabBarStyle: {
    height: 80,
  },
});
