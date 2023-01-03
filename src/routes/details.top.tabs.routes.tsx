import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Path } from "phosphor-react-native";

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
            <FontAwesome name="gears" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="DadosTelemetria"
        component={DadosTelemetria}
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="database" color="#FFF" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="PeriodoPermanencia"
        component={PeriodoPermanencia}
        options={{
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons
              name="clock-outline"
              color="#FFF"
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trajeto"
        component={Trajeto}
        options={{
          tabBarIcon: ({}) => <Path color="#FFF" size={26} />,
        }}
      />
      <Tab.Screen
        name="DispositivoTelemetria"
        component={DispositivoTelemetria}
        options={{
          tabBarIcon: ({}) => (
            <MaterialIcons name="wifi" color="#FFF" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
