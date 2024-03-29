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
import { Route } from "@screens/AppScreens/EquipmentDetails/Route";
import { PeriodoPermanencia } from "@screens/AppScreens/EquipmentDetails/PeriodoPermanencia";

const Tab = createMaterialTopTabNavigator();

export function DetailsTopTabs({ route }: any) {
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
        initialParams={route.params}
        options={{
          tabBarIcon: () => <FontAwesome name="gears" color="#FFF" size={22} />,
        }}
      />
      <Tab.Screen
        name="TelemetryData"
        component={TelemetryData}
        initialParams={route.params}
        options={{ tabBarIcon: () => <IconTelemetryData /> }}
      />
      <Tab.Screen
        name="PeriodoPermanencia"
        component={PeriodoPermanencia}
        initialParams={route.params}
        options={{ tabBarIcon: () => <IconPeriod /> }}
      />
      <Tab.Screen
        name="Route"
        component={Route}
        initialParams={route.params}
        options={{ tabBarIcon: () => <IconRoute /> }}
      />
      <Tab.Screen
        name="TelemetryDevice"
        initialParams={route.params}
        component={TelemetryDevice}
        options={{ tabBarIcon: () => <IconTelemetryDevice /> }}
      />
    </Tab.Navigator>
  );
}
