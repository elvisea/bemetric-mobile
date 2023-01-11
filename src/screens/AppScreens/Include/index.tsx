import { ConnectionOption } from "@components/Include/ConnectionOption";
import { LayoutDefault } from "@components/LayoutDefault";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

export function Include() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <ConnectionOption
        mt={16}
        title="Identificar Bluetooth"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", { screen: "Bluetooth" })
        }
      />

      <ConnectionOption
        mt={8}
        title="Identificar por QRcode"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", { screen: "QRCode" })
        }
      />

      <ConnectionOption
        mt={8}
        title="Idendificação manual"
        onPress={() =>
          navigation.navigate("IncludeStackRoutes", {
            screen: "AddEquipment",
          })
        }
      />
    </LayoutDefault>
  );
}
