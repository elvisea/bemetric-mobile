import { useNavigation, DrawerActions } from "@react-navigation/native";

import { VStack } from "native-base";

import { THEME } from "@theme/theme";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

import { ConnectionOption } from "@components/Include/ConnectionOption";

export function ConfigureConnection() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <VStack flex={1} w="full">
        <HeaderDefault title="Configure a conexão de dados" />

        <ConnectionOption
          mt={16}
          title="Conexão WIFI"
          onPress={() =>
            navigation.navigate("IncludeStackRoutes", { screen: "WiFi" })
          }
        />

        <ConnectionOption
          mt={8}
          title="Conexão Redes Móveis"
          onPress={() =>
            navigation.navigate("IncludeStackRoutes", {
              screen: "MobileNetwork",
            })
          }
        />

        <ConnectionOption
          mt={8}
          title="Conexão manual"
          onPress={() =>
            navigation.navigate("IncludeStackRoutes", {
              screen: "ManualConnection",
            })
          }
        />
      </VStack>

      <ButtonFull
        title="Avançar sem conexão"
        onPress={() => navigation.navigate("ChooseEquipment")}
      />
    </LayoutDefault>
  );
}
