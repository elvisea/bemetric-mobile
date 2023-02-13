import { StyleSheet } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { THEME } from "@theme/theme";
import { Container, Content } from "./styles";

import { CUSTOMER, TOKEN, USER } from "@constants/storage";
import { IconMenuDrawer } from "@components/IconMenuDrawer";

const CustomDrawer = (props: any) => {
  const { resetUserState } = useAuth();
  const { resetCustomerState } = useCustomer();

  const handleLogout = async () => {
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(CUSTOMER);
    await AsyncStorage.removeItem(TOKEN);

    resetUserState();
    resetCustomerState();
  };

  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <Content>
          <DrawerItemList {...props} />

          <DrawerItem
            onPress={() => console.log("WhatsApp...")}
            pressColor="transparent"
            style={{
              ...styles.item,
              backgroundColor: "#0FD3BC",
              marginBottom: 16,
            }}
            label="WhatsApp"
            labelStyle={{ ...styles.label, color: THEME.colors.white }}
            icon={() => (
              <MaterialCommunityIcons
                name="whatsapp"
                size={RFValue(34)}
                color="#FFF"
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
