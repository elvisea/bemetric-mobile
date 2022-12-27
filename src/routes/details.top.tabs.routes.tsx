import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { THEME } from "@theme/theme";

import { DadosTelemetria } from "@screens/AppScreens/Options/DadosTelemetria";
import { DispositivoTelemetria } from "@screens/AppScreens/Options/DispositivoTelemetria";
import { Equipamento } from "@screens/AppScreens/Options/Equipamento";
import { PeriodoPermanencia } from "@screens/AppScreens/Options/PeriodoPermanencia";
import { Trajeto } from "@screens/AppScreens/Options/Trajeto";

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
        name="Equipamento"
        component={Equipamento}
        options={{
          tabBarIcon: ({}) => (
            <MaterialIcons name="settings" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="DadosTelemetria"
        component={DadosTelemetria}
        options={{
          tabBarIcon: ({}) => (
            <MaterialIcons name="android" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="PeriodoPermanencia"
        component={PeriodoPermanencia}
        options={{
          tabBarIcon: ({}) => (
            <MaterialIcons name="data-usage" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Trajeto"
        component={Trajeto}
        options={{
          tabBarIcon: ({}) => (
            <MaterialIcons name="map" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="DispositivoTelemetria"
        component={DispositivoTelemetria}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="wifi" color="#FFF" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
