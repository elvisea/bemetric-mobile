import React from "react";
import { Box, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";

export default function SignIn() {
  const navigation = useNavigation();

  const handleNextPage = () => navigation.navigate("stepName");

  return (
    <VStack
      flex={1}
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="blue.700"
    >
      <Box width="full" px={8} alignItems="center" mt={122}>
        <Logo />

        <Input placeholder="E-mail" mb={8} mt={90} />

        <Input placeholder="Senha" secureTextEntry />

        <Button title="Entrar" mt={16} w={188} h={52} />
      </Box>

      <Box w="full">
        <ButtonFull title="CRIAR CONTA" onPress={handleNextPage} />
      </Box>
    </VStack>
  );
}
