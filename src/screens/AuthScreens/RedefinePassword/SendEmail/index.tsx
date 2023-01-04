import React, { useState } from "react";
import { Alert } from "react-native";

import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  email: string;
}

const schema = yup.object({
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
});

export function SendEmail() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ email }: FormProps) => {
    try {
      setIsLoading(true);

      const response = await api.post("/Usuario/EsqueciSenha", {
        email,
        tipoAplicacao: 0,
      });

      if (response.data === 0) {
        navigation.navigate("ValidateCode", { email });
      }

      if (response.data === 1) {
        Alert.alert(
          "Erro ao tentar redefinir senha!",
          "Email não foi encontrado. Tente novamente."
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Erro ao tentar redefinir senha!",
          "Email não está habilitado."
        );
      }

      if (response.data === 3) {
        Alert.alert(
          "Erro ao tentar redefinir senha!",
          "Email inválido. Tente novamente."
        );
      }
    } catch (error) {
      Alert.alert("Erro ao tentar redefinir senha!", `${error}`);
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
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              keyboardType="email-address"
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleNextPage)}
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
