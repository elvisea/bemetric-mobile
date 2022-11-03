import React from "react";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function NovaContaOuJaExistente() {
  const navigation = useNavigation();

  const inserirTokenCliente = () => navigation.navigate("InserirTokenCliente");
  const inserirDadosCliente = () => navigation.navigate("InserirDadosCliente");

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
        <Input placeholder="Vincular Cliente" />
      </Box>
      <ButtonFull title="inserirDadosCliente" onPress={inserirDadosCliente} />
      <ButtonFull title="inserirTokenCliente" onPress={inserirTokenCliente} />
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


/// na opcao vincular cliente teremos dus opçoes 


// inserir dados cliente (criação)
    // inserir seenha e consfirmar senha
    // cofdigo de ativação
    // Login

// inserir tokem de um clinte ja existente

  // // inserir seenha e consfirmar senha
      // cofdigo de ativação
      //Login
