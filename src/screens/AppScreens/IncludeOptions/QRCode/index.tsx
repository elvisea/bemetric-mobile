import { useNavigation, DrawerActions } from "@react-navigation/native";

import { LayoutDefault } from "@components/LayoutDefault";

import { THEME } from "@theme/theme";

export function QRCode() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    />
  );
}
