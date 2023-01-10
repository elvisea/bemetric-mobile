import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { THEME } from "@theme/theme";

import IconTelemetryData from "@assets/telemetry-data.svg";
import IconPeriod from "@assets/period.svg";
import IconRoute from "@assets/route.svg";
import IconTelemetryDevice from "@assets/telemetry-device.svg";

import { TelemetryData } from "@screens/AppScreens/EquipmentDetails/TelemetryData";
import { TelemetryDevice } from "@screens/AppScreens/EquipmentDetails/TelemetryDevice";
import { Equipament } from "@screens/AppScreens/EquipmentDetails/Equipament";
import { Period } from "@screens/AppScreens/EquipmentDetails/Period";
import { Route } from "@screens/AppScreens/EquipmentDetails/Route";

const Tab = createMaterialTopTabNavigator();

export function DetailsTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME.colors.white,
        tabBarStyle: { backgroundColor: THEME.colors.blue[700], height: 52 },
        tabBarIndicatorStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Tab.Screen
        name="Equipament"
        component={Equipament}
        options={{
          tabBarIcon: () => <FontAwesome name="gears" color="#FFF" size={22} />,
        }}
      />
      <Tab.Screen
        name="TelemetryData"
        component={TelemetryData}
        options={{ tabBarIcon: () => <IconTelemetryData /> }}
      />
      <Tab.Screen
        name="Period"
        component={Period}
        options={{ tabBarIcon: () => <IconPeriod /> }}
      />
      <Tab.Screen
        name="Route"
        component={Route}
        options={{ tabBarIcon: () => <IconRoute /> }}
      />
      <Tab.Screen
        name="TelemetryDevice"
        component={TelemetryDevice}
        options={{ tabBarIcon: () => <IconTelemetryDevice /> }}
      />
    </Tab.Navigator>
  );
}
