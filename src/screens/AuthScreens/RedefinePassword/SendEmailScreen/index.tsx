import React, { useState } from "react";
import { Alert } from "react-native";

import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { TypeForm } from "./types";

import {
  schema,
  responses,
  SUCCESS,
  GENERIC_ERROR,
  NETWORK_ERROR,
} from "./constants";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function SendEmailScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const showAlertForCode = (code: number) => {
    const message = responses[code] || responses[GENERIC_ERROR];
    Alert.alert(message.title, message.subtitle);
  };

  const handleNextPage = async ({ email }: TypeForm) => {
    try {
      setIsLoading(true);

      const { data } = await api.post("/Usuario/EsqueciSenha", {
        email,
        tipoAplicacao: 0,
      });

      if (data === SUCCESS) {
        navigation.navigate("ValidateCodeScreen", { email });
      } else {
        showAlertForCode(data);
      }
    } catch (error) {
      showAlertForCode(NETWORK_ERROR);
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
