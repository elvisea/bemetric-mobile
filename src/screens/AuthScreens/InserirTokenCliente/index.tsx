import React from "react";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function InserirTokenCliente() {
  const navigation = useNavigation();

  const criarContaCliente = () => navigation.navigate("ConfirmPassword");

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
        <Input placeholder="Inserir Token" />
        {/* <Input placeholder="Email do usuario" /> */}
      </Box>
      {/* <ButtonFull title="Avançar" onPress={() => handleNextPage} /> */}
      <ButtonFull title="Avançar" onPress={() => criarContaCliente} />
    </LayoutDefault>
  );
}
