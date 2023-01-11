import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

import { LayoutDefault } from "@components/LayoutDefault";
import { IncludeHeader } from "@components/Include/IncludeHeader";

export function Bluetooth() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <IncludeHeader title="Bluetooh" />
    </LayoutDefault>
  );
}
