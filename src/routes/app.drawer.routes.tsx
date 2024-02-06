import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Linking from "expo-linking";

import { THEME } from "@theme/theme";

import { itemsDrawer } from "./constants";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { DrawerItem } from "@components/DrawerItem";
import { DrawerList } from "@components/DrawerList";

import { DrawerFooter } from "@components/DrawerFooter";
import { DrawerContainer } from "@components/DrawerContainer";

const { Navigator, Screen } = createDrawerNavigator();

type Props = {
  navigation: any;
};

const CustomDrawerContent: React.FC<Props> = ({ navigation }) => {
  const { signOut } = useAuth();
  const { resetCustomer, whatsapp } = useCustomer();

  const handleLogout = async () => {
    signOut();
    resetCustomer();
  };
  return (
    <DrawerContainer>
      <DrawerList>
        {itemsDrawer.map((item, index) => (
          <DrawerItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={() => navigation.navigate(item.name)}
          />
        ))}

        <DrawerItem
          title="WhatsApp"
          onPress={() => {
            Linking.openURL(`http://api.whatsapp.com/send?phone=${whatsapp}`);
          }}
          color={THEME.colors.white}
          circle={THEME.colors.white}
          background={THEME.colors.cyan[200]}
          icon={
            <MaterialCommunityIcons
              name="whatsapp"
              size={24}
              color={THEME.colors.cyan[200]}
            />
          }
        />

        <DrawerItem
          title="Sair"
          onPress={handleLogout}
          icon={
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={THEME.colors.white}
            />
          }
        />
      </DrawerList>

      <DrawerFooter title="Versão 0.0" />
    </DrawerContainer>
  );
};

export default function AppDrawerRoutes() {
  return (
    <>
      <StatusBar />

      <Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: "90%" },
        }}
      >
        {itemsDrawer.map((route, index) => (
          <Screen key={index} name={route.name} component={route.component} />
        ))}
      </Navigator>
    </>
  );
}
