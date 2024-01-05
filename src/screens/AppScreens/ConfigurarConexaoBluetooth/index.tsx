import { FlatList } from "react-native";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

import { options } from "./constants";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";
import { ConnectionOption } from "@components/Include/ConnectionOption";

export function ConfigurarConexaoBluetooth() {
  const navigation = useNavigation();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Configure a conexão bluetooth" />

      <FlatList
        data={options}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: option }) => (
          <ConnectionOption
            mt={option.mt}
            title={option.title}
            onPress={() =>
              navigation.navigate("IncludeStackRoutes", {
                screen: option.screen,
              })
            }
          />
        )}
      />
    </LayoutDefault>
  );
}
