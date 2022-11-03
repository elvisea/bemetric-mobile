import React from "react";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function InserirDadosUsuario() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("NovaContaOuJaExistente");

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
        <Input placeholder="Nome do usuario" />
        {/* <ButtonFull title="Avançar" onPress={() => criarContaCliente()} /> */}
        <Input placeholder="Email do usuario" />
      </Box>
      <ButtonFull title="Avançar" onPress={() => handleNextPage()} />
    </LayoutDefault>
  );
}
