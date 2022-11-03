import React from "react";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function AceitarTermos() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("InserirDadosUsuario");

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
        <Input placeholder="AceitarTermos" />
      </Box>
      <ButtonFull title="Avançar" onPress={handleNextPage} />
    </LayoutDefault>
  );
}

// Irá ser selecionado se vai criar
// conta nova ou vincular a uma conta ja existente

//########################################################################

// se conta nova
// informar CNPJ ou CPF e nome do cliente

//########################################################################

// se conta já existente
// vai informar o token do cliente
