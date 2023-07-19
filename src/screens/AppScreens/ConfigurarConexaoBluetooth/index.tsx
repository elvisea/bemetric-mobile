import { HeaderDefault } from "@components/HeaderDefault";
import { ConnectionOption } from "@components/Include/ConnectionOption";
import { LayoutDefault } from "@components/LayoutDefault";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

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

      <ConnectionOption
        mt={16}
        title="Identificar Bluetooth"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", { screen: "Bluetooth" })
        }
      />

      <ConnectionOption
        mt={8}
        title="Identificar QRcode"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", { screen: "QRCode" })
        }
      />

      <ConnectionOption
        mt={8}
        title="Identificar Manualmente"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", {
            screen: "VincularDispositivo",
          })
        }
      />
    </LayoutDefault>
  );
}
