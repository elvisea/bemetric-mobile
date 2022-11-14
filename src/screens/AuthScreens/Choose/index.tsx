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

  const handleNextPage = (screen: "ClientCode" | "CreateAccount") => {
    navigation.navigate(screen, { name, email });
  };

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
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
          onPress={() => handleNextPage("CreateAccount")}
        />

        <Button
          title="Vincular Conta"
          h={52}
          w={188}
          mb={8}
          onPress={() => handleNextPage("ClientCode")}
        />

        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Você precisa do token fornecido{"\n"}pelo administrador do cliente.
        </Heading>
      </Center>
    </LayoutDefault>
  );
}
