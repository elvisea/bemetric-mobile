import { LayoutDefault } from "@components/LayoutDefault";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

export function AtendimentoSuporte() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      icon="menu"
      functionIcon={handleMenu}
    />
  );
}
