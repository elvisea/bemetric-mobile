import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { schema } from "./constants";
import { TypeForm, TypeParams } from "./types";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { RadioButton } from "@components/RadioButton";
import { LayoutDefault } from "@components/LayoutDefault";

export function CreateAccountScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(0);

  const route = useRoute();
  const { name, email, type } = route.params as TypeParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ client, identification }: TypeForm) => {
    try {
      setIsLoading(true);

      const response = await api.get(
        `/Cliente/ValidarCpfCnpj?CpfCnpj=${Number(identification)}`,
      );

      if (response.data === 0) {
        navigation.navigate("CreatePasswordScreen", {
          name,
          email,
          client,
          identification,
          type,
          tipoCNPJCPF: document,
        });
      }

      if (response.data === 1) {
        Alert.alert("CPF/CNPJ já cadastrado!", "CPF/CNPJ já cadastrado!");
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
          name="client"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome do Cliente"
              mb={8}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.client?.message}
            />
          )}
        />

        <HStack w="full" mb="12px" justifyContent="flex-start">
          <RadioButton
            label="CPF"
            picked={document === 1}
            onPress={() => setDocument(1)}
          />
          <RadioButton
            label="CNPJ"
            picked={document === 0}
            onPress={() => setDocument(0)}
          />
        </HStack>

        <Controller
          control={control}
          name="identification"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={document === 0 ? "CNPJ" : "CPF"}
              onChangeText={onChange}
              keyboardType="numeric"
              returnKeyType="send"
              value={value}
              errorMessage={errors.identification?.message}
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
