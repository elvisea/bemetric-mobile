import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { FontAwesome5, Entypo } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { FullMap } from "@screens/AppScreens/Markers/FullMap";

import GeofencesStackRoutes from "./geofences.stack.routes";
import PointsInterestStackRoutes from "./points.Interest.stack.routes";

const Tab = createMaterialTopTabNavigator();

export function MarkersTopTabsRoutes() {
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
        name="GeofencesStackRoutes"
        component={GeofencesStackRoutes}
        options={{
          tabBarIcon: () => <Entypo name="location" size={22} color="white" />,
        }}
      />

      <Tab.Screen
        name="PointsInterestStackRoutes"
        component={PointsInterestStackRoutes}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="dot-circle" size={22} color="white" />
          ),
        }}
      />

      <Tab.Screen
        name="FullMap"
        component={FullMap}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="map-marked-alt" size={22} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
