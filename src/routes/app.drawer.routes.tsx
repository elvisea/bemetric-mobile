import * as React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { AccountDetails } from "@screens/AppScreens/AccountDetails";
import { ChangeClient } from "@screens/AppScreens/ChangeClient";
import { SupportService } from "@screens/AppScreens/SupportService";

import { CustomDrawer } from "@components/CustomDrawer";
import { IconMenuDrawer } from "@components/IconMenuDrawer";

import { THEME } from "@theme/theme";

import HomeStackRoutes from "./home.stack.routes";

const { Navigator, Screen } = createDrawerNavigator();

export default function AppDrawerRoutes() {
  return (
    <>
      <StatusBar />

      <Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: "90%" },
          drawerContentStyle: styles.drawerContentStyle,
          drawerLabelStyle: styles.drawerLabelStyle,
          drawerItemStyle: styles.drawerItemStyle,
        }}
      >
        <Screen
          name="HomeTabRoutes"
          component={HomeStackRoutes}
          options={{
            drawerLabel: "Início",
            drawerIcon: () => (
              <IconMenuDrawer
                icon={
                  <FontAwesome
                    name="home"
                    size={18}
                    color={THEME.colors.white}
                  />
                }
              />
            ),
          }}
        />

        <Screen
          name="AccountDetails"
          component={AccountDetails}
          options={{
            drawerLabel: "Detalhes da Conta",
            drawerIcon: () => (
              <IconMenuDrawer
                icon={
                  <FontAwesome
                    name="user"
                    size={18}
                    color={THEME.colors.white}
                  />
                }
              />
            ),
          }}
        />

        <Screen
          name="ChangeClient"
          component={ChangeClient}
          options={{
            drawerLabel: "Alterar Cliente",
            drawerIcon: () => (
              <IconMenuDrawer
                icon={
                  <FontAwesome
                    name="users"
                    size={18}
                    color={THEME.colors.white}
                  />
                }
              />
            ),
          }}
        />

        <Screen
          name="SupportService"
          component={SupportService}
          options={{
            drawerLabel: "Atendimento de Suporte",
            drawerIcon: () => (
              <IconMenuDrawer
                icon={
                  <MaterialIcons
                    name="email"
                    size={18}
                    color={THEME.colors.white}
                  />
                }
              />
            ),
          }}
        />
      </Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContentStyle: {
    backgroundColor: THEME.colors.blue[700],
    paddingHorizontal: 16,
  },

  drawerItemStyle: {
    backgroundColor: THEME.colors.white,
    marginBottom: 16,
    height: RFValue(54),
    borderRadius: 28,
    paddingHorizontal: 8,
    justifyContent: "center",
  },

  drawerLabelStyle: {
    color: THEME.colors.blue[700],
    marginLeft: -20,
  },
});
