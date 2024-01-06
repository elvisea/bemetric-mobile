import React, { useState } from "react";
import { Alert } from "react-native";

import { Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { responses, schema } from "./constants";
import { TypeForm, TypeParams } from "./types";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function EnterNewPasswordScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const { email, codigoAtivacao } = route.params as TypeParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ password }: TypeForm) => {
    try {
      setIsLoading(true);

      const response = await api.put(`/Usuario/AlterarEsqueciSenha`, {
        email,
        codigoAtivacao,
        novaSenha: password,
        tipoAplicacao: 1,
      });

      if (response.data === 0) {
        Alert.alert(
          responses[response.data].title,
          responses[response.data].subtitle,
          [
            {
              text: responses[response.data].text,
              onPress: () => navigation.navigate("SignInScreen"),
            },
          ],
        );
      }

      if (response.data !== 0) {
        Alert.alert(
          responses[response.data].title,
          responses[response.data].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(responses[6].title, responses[6].subtitle);
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
