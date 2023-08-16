import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { EventLog } from "@screens/AppScreens/Notifications/EventLog";

import { THEME } from "@theme/theme";
import { LogScreen } from "@screens/AppScreens/Notifications/LogScreen";

const Tab = createMaterialTopTabNavigator();

export function NotificationsTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName="EventLog"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME.colors.white,
        tabBarStyle: { backgroundColor: THEME.colors.blue[700], height: 52 },
        tabBarIndicatorStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Tab.Screen
        name="EventLog"
        component={EventLog}
        options={{
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="bell-ring" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="LogScreen"
        component={LogScreen}
        options={{
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="bell-plus" color="#FFF" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
