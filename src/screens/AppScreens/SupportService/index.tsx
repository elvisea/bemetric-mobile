import { Box, Text, VStack } from "native-base";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import { THEME } from "@theme/theme";

export function SupportService() {
  const navigation = useNavigation();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <VStack w="full" flex={1} justifyContent="space-between">
        <VStack>
          <HeaderDefault title="Atendimento de Suporte" mb="52px" />

          <Box w="full" alignItems="center">
            <Text
              color="blue.700"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
            >
              E-mail
            </Text>
            <Text
              color="black"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
              mb="16px"
            >
              suporte@b2k.com.br
            </Text>

            <Text
              color="blue.700"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
            >
              Telefone
            </Text>
            <Text
              color="black"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
              mb="16px"
            >
              (41) 3333-3333
            </Text>

            <Text
              color="blue.700"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
            >
              Whatsapp
            </Text>
            <Text color="black" fontSize="16px" fontFamily="Roboto_400Regular">
              (41) 9 8888-8888
            </Text>
          </Box>
        </VStack>

        <VStack mb="36px" w="full" alignItems="center" justifyContent="center">
          <Text
            color="blue.700"
            fontSize="16px"
            fontFamily="Roboto_400Regular"
            textAlign="center"
          >
            Horário de atendimento{"\n"} De segunda a sexta, das 08:00 às 18:00
          </Text>
        </VStack>
      </VStack>
    </LayoutDefault>
  );
}
