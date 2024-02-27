import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { EventLogTabOne } from "@screens/AppScreens/Notifications/screens/EventLogTabOne";
import { EventLogTabTwo } from "@screens/AppScreens/Notifications/screens/EventLogTabTwo";

import { THEME } from "@theme/theme";

const Tab = createMaterialTopTabNavigator();

export function NotificationsTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName="EventLogTabOne"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME.colors.white,
        tabBarStyle: { backgroundColor: THEME.colors.blue[700], height: 52 },
        tabBarIndicatorStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Tab.Screen
        name="EventLog"
        component={EventLogTabOne}
        options={{
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="bell-ring" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="EventLogTabTwo"
        component={EventLogTabTwo}
        options={{
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="bell-plus" color="#FFF" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
