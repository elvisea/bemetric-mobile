import React from "react";
import { Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "@theme/theme";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function ClientCode() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("CreatePassword");

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Insira o token fornecido pelo{"\n"}administrador do cliente.
        </Heading>
      </Box>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}
