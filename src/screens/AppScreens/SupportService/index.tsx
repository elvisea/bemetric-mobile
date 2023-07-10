import { Alert } from "react-native";
import { useCallback, useState } from "react";

import axios from "axios";
import { Box, Text, VStack } from "native-base";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { useCustomer } from "@hooks/customer";

import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { IContact } from "./interfaces";

export function SupportService() {
  const navigation = useNavigation();

  const { customer } = useCustomer();

  const [contact, setContact] = useState<IContact | null>(null);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const getContact = async () => {
    try {
      const response = await api.post("/ContatosParceiro/ObterListaSuporte", {
        codigoCliente: customer?.codigoCliente,
      });

      setContact(response.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) getContact();

      return () => {
        isActive = false;
      };
    }, [])
  );

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
              {contact?.emailSuporte}
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
              {contact?.telefone}
            </Text>

            <Text
              color="blue.700"
              fontSize="16px"
              fontFamily="Roboto_400Regular"
            >
              Whatsapp
            </Text>
            <Text color="black" fontSize="16px" fontFamily="Roboto_400Regular">
              {contact?.whatsapp}
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
            {contact?.descritivo}
            {/* Horário de atendimento{"\n"} De segunda a sexta, das 08:00 às 18:00 */}
          </Text>
        </VStack>
      </VStack>
    </LayoutDefault>
  );
}
