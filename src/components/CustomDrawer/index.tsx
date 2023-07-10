import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Linking from "expo-linking";

import api from "@services/api";
import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { THEME } from "@theme/theme";
import { Container, Content } from "./styles";

import { CUSTOMER, TOKEN, USER } from "@constants/storage";
import { IconMenuDrawer } from "@components/IconMenuDrawer";

const CustomDrawer = (props: any) => {
  const { signOut } = useAuth();
  const { resetCustomerState, customer } = useCustomer();

  const [whatsApp, setWhatsApp] = useState<string | null>(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(CUSTOMER);
    await AsyncStorage.removeItem(TOKEN);

    setWhatsApp(null);
    signOut();
    resetCustomerState();
  };

  const getWhatsApp = async () => {
    try {
      const response = await api.post("/ContatosParceiro/ObterListaSuporte", {
        codigoCliente: customer?.codigoCliente,
      });

      setWhatsApp(response.data[0].whatsapp);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
    }
  };

  useEffect(() => {
    let isActive = true;

    if (isActive) getWhatsApp();

    return () => {
      isActive = false;
    };
  }, [customer]);

  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <Content>
          <DrawerItemList {...props} />

          <DrawerItem
            onPress={() => {
              Linking.openURL(`http://api.whatsapp.com/send?phone=${whatsApp}`);
            }}
            pressColor="transparent"
            style={{
              ...styles.item,
              backgroundColor: THEME.colors.cyan[200],
              marginBottom: 16,
            }}
            label="WhatsApp"
            labelStyle={{ ...styles.label, color: THEME.colors.white }}
            icon={() => (
              <MaterialCommunityIcons
                name="whatsapp"
                size={RFValue(34)}
                color={THEME.colors.white}
              />
            )}
          />

          <DrawerItem
            onPress={handleLogout}
            pressColor="transparent"
            style={styles.item}
            label="Sair"
            labelStyle={styles.label}
            icon={() => (
              <IconMenuDrawer
                icon={
                  <MaterialCommunityIcons
                    name="logout"
                    size={18}
                    color={THEME.colors.white}
                  />
                }
              />
            )}
          />
        </Content>
      </DrawerContentScrollView>
    </Container>
  );
};

export { CustomDrawer };

const styles = StyleSheet.create({
  item: {
    backgroundColor: THEME.colors.white,
    height: RFValue(54),
    paddingHorizontal: 8,
    borderRadius: 28,
    justifyContent: "center",
  },
  label: {
    color: THEME.colors.blue[700],
    marginLeft: -20,
  },
});
