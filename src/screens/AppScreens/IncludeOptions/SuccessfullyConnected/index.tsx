import { Text, VStack } from "native-base";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function SuccessfullyConnected() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
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
          Equipamento conectado com sucesso
        </Text>
      </VStack>

      <ButtonFull title="AVANÇAR" onPress={() => {}} />
    </LayoutDefault>
  );
}
