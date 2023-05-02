import React, { useState } from "react";
import { Alert } from "react-native";

import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  name: string;
  email: string;
}

const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
});

export function NameAndEmail() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ name, email }: FormProps) => {
    try {
      setIsLoading(true);

      const response = await api.get(`/Usuario/ValidarEmail?email=${email}`);

      if (response.data === 0) {
        navigation.navigate("AcceptTerms", { name, email });
      }

      if (response.data === 1) {
        Alert.alert("Email já cadastrado!", "Email já cadastrado!");
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
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
              mb={4}
            />
          )}
        />

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
