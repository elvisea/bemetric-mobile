import React from "react";
import { Box } from "native-base";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  novaSenha: string;
  novaSenhaConfirmada: string;
}

interface Params {
  email: string;
  password: string;
}

const schema = yup.object({
  novaSenha: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  novaSenhaConfirmada: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("novaSenha"), null], "A confirmação da senha não confere"),
});

export function TemporaryPassword() {
  const route = useRoute();
  const navigation = useNavigation();

  const { email, password } = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ novaSenha }: FormProps) => {
    try {
      const response = await api.put("Usuario/TrocarSenhaTemporaria", {
        email,
        senha: password,
        novaSenha,
      });

      if (response.data === 0) {
        Alert.alert(
          "Senha Alterada Com Sucesso!",
          "Senha Alterada Com Sucesso!",
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
          "Falha ao tentar alterar senha!",
          "Falha ao tentar alterar senha!"
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Falha ao tentar alterar senha!",
          "Falha ao tentar alterar senha!"
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro ao tentar alterar senha!",
        "Erro ao tentar alterar senha!"
      );
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
          name="novaSenha"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Crie uma senha"
              secureTextEntry
              mb={8}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.novaSenha?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="novaSenhaConfirmada"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme sua senha"
              secureTextEntry
              onChangeText={onChange}
              returnKeyType="send"
              value={value}
              errorMessage={errors.novaSenhaConfirmada?.message}
            />
          )}
        />
      </Box>
      <ButtonFull title="Avançar" onPress={handleSubmit(handleNextPage)} />
    </LayoutDefault>
  );
}
