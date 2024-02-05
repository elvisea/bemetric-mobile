import React, { useState } from "react";
import { Alert } from "react-native";

import { Box, Heading, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Form, Params } from "./types";
import { resposta, schema } from "./constants";

import { ButtonFull } from "@components/ButtonFull";
import { InputToken } from "@components/InputToken";
import { LayoutDefault } from "@components/LayoutDefault";

export function ClientCodeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const params = route.params as Params;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const advanceNextStep = (token: string) => {
    navigation.navigate("CreatePasswordScreen", {
      type: params.type,
      name: params.name,
      email: params.email,
      tokenCliente: token,
    });

    reset();
  };

  const verificarToken = async (props: Form) => {
    try {
      setIsLoading(true);
      const token = Object.values(props).join("");

      const response = await api.get(`/Cliente/ValidarToken?token=${token}`);

      if (response.data === 0) {
        Alert.alert(resposta[0].title, resposta[0].subtitle, [
          {
            text: resposta[0].text,
            onPress: () => reset(),
          },
        ]);
      }

      if (response.data === 1) advanceNextStep(token);
    } catch (error) {
      Alert.alert(resposta[1].title, resposta[1].subtitle, [
        {
          text: resposta[1].text,
          onPress: () => reset(),
        },
      ]);
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
        onPress={handleSubmit(verificarToken)}
      />
    </LayoutDefault>
  );
}
