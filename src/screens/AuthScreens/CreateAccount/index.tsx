import React from "react";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function CreateAccount() {
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
        <Input placeholder="Nome do Cliente" mb={8} />
        <Input placeholder="CPF ou CNPJ" keyboardType="email-address" />
      </Box>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}
