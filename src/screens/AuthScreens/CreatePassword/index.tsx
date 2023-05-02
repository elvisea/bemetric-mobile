import { Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import axios from "axios";
import * as yup from "yup";
import { Box } from "native-base";
import { useForm, Controller } from "react-hook-form";
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
  name: string;
  email: string;
  client: string;
  identification: string;
  type: number;
  tokenCliente: string;
  tipoCNPJCPF: number;
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

export function CreatePassword() {
  const route = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    name,
    email,
    client,
    identification,
    type,
    tokenCliente,
    tipoCNPJCPF,
  } = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ password }: FormProps) => {
    try {
      setIsLoading(true);

      const response = await api.post(
        `/Usuario/GerarCodigoAtivacao?email=${email}`
      );

      if (response.data === 1) {
        navigation.navigate("VerifyToken", {
          name,
          email,
          password,
          client,
          identification,
          type,
          tokenCliente,
          tipoCNPJCPF,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
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
      <ButtonFull
        title="Avançar"
        isLoading={isLoading}
        onPress={handleSubmit(handleNextPage)}
      />
    </LayoutDefault>
  );
}
