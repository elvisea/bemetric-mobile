import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Text, VStack } from "native-base";

import { THEME } from "@theme/theme";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { IncludeHeader } from "@components/Include/IncludeHeader";

export function MobileNetwork() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <IncludeHeader title="Conexão Redes Móveis" />

      <VStack
        flex={1}
        w="full"
        p="16px"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontFamily="Montserrat_400Regular"
          fontSize="14px"
          color="blue.700"
        >
          Conexão Redes Móveis
        </Text>
      </VStack>

      <ButtonFull title="SALVAR" onPress={() => {}} />
    </LayoutDefault>
  );
}
