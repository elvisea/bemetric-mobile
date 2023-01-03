import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Detailing } from "@screens/AppScreens/Notifications/Detailing";
import { EventLog } from "@screens/AppScreens/Notifications/EventLog";

import { THEME } from "@theme/theme";

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
            <FontAwesome name="gears" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Detailing"
        component={Detailing}
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="database" color="#FFF" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
