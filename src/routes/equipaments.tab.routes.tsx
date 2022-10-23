import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Equipament } from '@screens/AppScreens/Equipament/Equipament';
import { TelemetryData } from '@screens/AppScreens/Equipament/TelemetryData';
import { PeriodOfStay } from '@screens/AppScreens/Equipament/PeriodOfStay';
import { Track } from '@screens/AppScreens/Equipament/Track';
import { TelemetryDevice } from '@screens/AppScreens/Equipament/TelemetryDevice';

import { THEME } from '@theme/theme';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function EquipamentsTopTabRoutes() {
  return (
    <Navigator
      initialRouteName='Equipament'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: { backgroundColor: "#FFF" }
      }}
    >

      <Screen
        name="Equipament"
        component={Equipament}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" color="#FFF" size={25} />
          ),
        }}
      />

      <Screen
        name="TelemetryDevice"
        component={TelemetryDevice}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="folder" color="#FFF" size={25} />
          ),
        }}
      />

      <Screen
        name="PeriodOfStay"
        component={PeriodOfStay}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="location-pin" color="#FFF" size={25} />
          ),
        }}
      />

      <Screen
        name="Track"
        component={Track}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="bluetooth" color="#FFF" size={25} />
          ),
        }}
      />

      <Screen
        name="TelemetryData"
        component={TelemetryData}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="android" color="#FFF" size={25} />
          ),
        }}
      />

    </Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 50,
    backgroundColor: THEME.colors.blue[700]
  }
})