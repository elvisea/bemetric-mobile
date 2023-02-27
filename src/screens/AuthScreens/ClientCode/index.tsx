import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, Heading, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { THEME } from "@theme/theme";

import { ButtonFull } from "@components/ButtonFull";
import { InputToken } from "@components/InputToken";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  [index: string]: string;
}

interface Params {
  name: string;
  email: string;
  type: number;
}

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

export function ClientCode() {
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

  const handleNextPage = async (props: FormProps) => {
    const token = `${props[1]}${props[2]}${props[3]}${props[4]}${props[5]}${props[6]}`;

    try {
      setIsLoading(true);

      const response = await api.get(`/Cliente/ValidarToken?token=${token}`);

      if (response.data === 0) {
        Alert.alert("Token inválido!", "Token inválido. Tente novamente.");
      }

      if (response.data === 1) {
        navigation.navigate("CreatePassword", {
          name,
          email,
          type,
          tokenCliente: token,
        });
      }
    } catch (error) {
      console.log("ERROR =>", error);
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
        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Insira o token fornecido pelo{"\n"}administrador do cliente.
        </Heading>

        <HStack mt={12} justifyContent="space-between" w="100%">
          {Array.of("1", "2", "3", "4", "5", "6").map((item) => (
            <Box key={item} width="52px">
              <Controller
                control={control}
                name={item}
                render={({ field: { onChange, value } }) => (
                  <InputToken
                    value={value}
                    placeholder="0"
                    borderWidth={1}
                    borderRadius={6}
                    keyboardType="numeric"
                    h="52px"
                    onChangeText={onChange}
                    errorMessage={errors[item]?.message}
                  />
                )}
              />
            </Box>
          ))}
        </HStack>
      </Box>
      <ButtonFull
        title="Avançar"
        isLoading={isLoading}
        onPress={handleSubmit(handleNextPage)}
      />
    </LayoutDefault>
  );
}
