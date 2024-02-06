import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

import { Box, Heading, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "@assets/logo.svg";

import api from "@services/api";
import { useAuth } from "@hooks/authentication";

import { TypeForm } from "./types";
import { responses, schema } from "./constants";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";

export function SignInScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();

  const handleLogin = async ({ email, password }: TypeForm) => {
    try {
      setIsLoading(true);

      const response = await api.post("/Usuario/ValidarLogin", {
        email,
        senha: password,
        tipoAplicacao: 1,
      });

      if (response.data.erro === 0) {
        await signIn(response.data);
      }

      if (response.data.erro === 5) {
        navigation.navigate("TemporaryPasswordScreen", { email, password });
      }

      if (response.data.erro !== 0 || 5) {
        Alert.alert(
          responses[response.data.erro].title,
          responses[response.data.erro].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => navigation.navigate("NameAndEmailScreen");

  async function getSetupDateTime() {
    try {
      const response = await api.get("setup/DateTime");
      console.log(response.data);
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  }

  useEffect(() => {
    getSetupDateTime();
  }, []);

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

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              mb={4}
              mt={90}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          mt={8}
          w={188}
          h={52}
          isLoading={isLoading}
          onPress={handleSubmit(handleLogin)}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SendEmailScreen")}
        >
          <Heading mt={8} color="white" fontSize={14}>
            Esqueci minha senha!
          </Heading>
        </TouchableOpacity>
      </Box>

      <Box w="full">
        <ButtonFull title="CRIAR CONTA" onPress={handleCreateAccount} />
      </Box>
    </VStack>
  );
}
