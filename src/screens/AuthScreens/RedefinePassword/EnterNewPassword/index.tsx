import React from "react";
import { Alert } from "react-native";

import { Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  password: string;
  password_confirm: string;
}

interface Params {
  email: string;
  codigoAtivacao: string;
}

const schema = yup.object({
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password"), null], "A confirmação da senha não confere"),
});

export function EnterNewPassword() {
  const route = useRoute();
  const navigation = useNavigation();

  const { email, codigoAtivacao } = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ password }: FormProps) => {
    try {
      const response = await api.put(`/Usuario/AlterarEsqueciSenha`, {
        email,
        codigoAtivacao,
        novaSenha: password,
        tipoAplicacao: 1,
      });

      if (response.data === 0) {
        Alert.alert(
          "Senha redefinida com sucesso!",
          "Senha redefinida com sucesso!",
          [
            {
              text: "Efetuar Login!",
              onPress: () => navigation.navigate("SignIn"),
            },
          ]
        );
      }

      if (response.data === 1) {
        Alert.alert(
          "Erro ao tentar criar nova senha!",
          "Código Inválido. Tente novamente."
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Erro ao tentar criar nova senha!",
          "Código de ativação expirado. Tente novamente."
        );
      }

      if (response.data === 3) {
        Alert.alert(
          "Erro ao tentar criar nova senha!",
          "Email não é do cliente. Tente novamente."
        );
      }

      if (response.data === 4) {
        Alert.alert(
          "Erro ao tentar criar nova senha!",
          "Email informado não está cadastrado. Tente novamente."
        );
      }

      if (response.data === 5) {
        Alert.alert(
          "Erro ao tentar criar nova senha!",
          "Email não habilitado. Tente novamente."
        );
      }
    } catch (error) {
      Alert.alert("Erro ao tentar criar nova senha!", `${error}`);
    }
  };

  return (
    <LayoutDefault
      bg="blue.700"
      firstIcon="chevron-left"
      handleFirstIcon={() => navigation.goBack()}
      justifyContent="flex-start"
    >
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Crie uma senha"
              secureTextEntry
              mb={8}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme sua senha"
              secureTextEntry
              onChangeText={onChange}
              returnKeyType="send"
              value={value}
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />
      </Box>
      <ButtonFull title="Avançar" onPress={handleSubmit(handleNextPage)} />
    </LayoutDefault>
  );
}
