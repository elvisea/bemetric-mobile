import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Box, Heading, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "@assets/logo.svg";

import api from "@services/api";
import { useAuth } from "@hooks/auth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";

interface FormProps {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("Informe seu e-mail.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
});

export function SignIn() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();

  const handleLogin = async ({ email, password }: FormProps) => {
    try {
      const response = await api.post("/Usuario/ValidarLogin", {
        email,
        senha: password,
        tipoAplicacao: 1,
      });

      if (response.data.erro === 0) {
        await signIn(response.data);
      }

      if (response.data.erro === 1) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não cadastrado. Tente novamente."
        );
      }

      if (response.data.erro === 2) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não habilitado. Tente novamente."
        );
      }

      if (response.data.erro === 3) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email do login não é de cliente."
        );
      }

      if (response.data.erro === 4) {
        Alert.alert(
          "Erro ao tentar fazer login!",
          "Email ou Senha inválida. Tente novamente."
        );
      }

      if (response.data.erro === 5) {
        navigation.navigate("TemporaryPassword", { email, password });
      }
    } catch (error) {
      Alert.alert("Erro ao tentar fazer login!", `${error}`);
    }
  };

  const handleCreateAccount = () => navigation.navigate("NameAndEmail");

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
          onPress={handleSubmit(handleLogin)}
        />

        <TouchableOpacity onPress={() => navigation.navigate("SendEmail")}>
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
