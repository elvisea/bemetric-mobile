import React, { useState } from "react";
import { Box, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Logo from "@assets/logo.svg";

import { useAuth } from "@hooks/auth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";

export function SignIn() {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    try {
      signIn({
        email,
        password,
      });
    } catch (error) {
      console.log("ERROR =>", error);
    }
  };

  const handleNextPage = () => navigation.navigate("NameAndEmail");

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

        <Input placeholder="E-mail" mb={8} mt={90} onChangeText={setEmail} />

        <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />

        <Button title="Entrar" mt={16} w={188} h={52} onPress={handleLogin} />
      </Box>

      <Box w="full">
        <ButtonFull title="CRIAR CONTA" onPress={handleNextPage} />
      </Box>
    </VStack>
  );
}
