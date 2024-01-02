import React from "react";
import { Center, Heading } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { LayoutDefault } from "@components/LayoutDefault";

interface Params {
  name: string;
  email: string;
}

export function Choose() {
  const navigation = useNavigation();

  const route = useRoute();
  const { name, email } = route.params as Params;

  const handleNextPage = (
    screen: "ClientCode" | "CreateAccount",
    type: number,
  ) => {
    navigation.navigate(screen, { name, email, type });
  };

  return (
    <LayoutDefault
      bg="blue.700"
      firstIcon="chevron-left"
      handleFirstIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <Center>
        <Heading
          mb={8}
          size={"sm"}
          textAlign="center"
          color={THEME.colors.white}
        >
          Agora crie sua conta de cliente{"\n"}ou{"\n"}a vincule a uma conta
          existente.
        </Heading>

        <Button
          title="Criar Conta"
          h={52}
          w={188}
          mb={16}
          onPress={() => handleNextPage("CreateAccount", 0)}
        />

        <Button
          title="Vincular Conta"
          h={52}
          w={188}
          mb={8}
          onPress={() => handleNextPage("ClientCode", 1)}
        />

        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Você precisa do token fornecido{"\n"}pelo administrador do cliente.
        </Heading>
      </Center>
    </LayoutDefault>
  );
}
