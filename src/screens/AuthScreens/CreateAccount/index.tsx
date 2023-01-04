import React, { useState } from "react";
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
  client: string;
  identification: string;
}

interface Params {
  name: string;
  email: string;
  type: number;
}

const schema = yup.object({
  client: yup.string().required("Informe o cliente"),
  identification: yup.string().required("Informe a identificação"),
});

export function CreateAccount() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { name, email, type } = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ client, identification }: FormProps) => {
    try {
      setIsLoading(true);

      const response = await api.get(
        `/Cliente/ValidarCpfCnpj?CpfCnpj=${Number(identification)}`
      );

      if (response.data === 0) {
        navigation.navigate("CreatePassword", {
          name,
          email,
          client,
          identification,
          type,
        });
      }

      if (response.data === 1) {
        Alert.alert("CPF/CNPJ já cadastrado!", "CPF/CNPJ já cadastrado!");
      }
    } catch (error) {
      Alert.alert("Erro ao tentar validar dados!", `${error}`);
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
              mb={4}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.client?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="identification"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="CPF ou CNPJ"
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
