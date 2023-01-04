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
    />
  );
}
