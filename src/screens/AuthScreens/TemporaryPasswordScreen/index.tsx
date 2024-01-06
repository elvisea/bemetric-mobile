import React, { useState } from "react";
import { Box } from "native-base";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import api from "@services/api";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

import { reponses, schema } from "./constants";
import { TypeForm, TypeParams } from "./types";

export function TemporaryPasswordScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = route.params as TypeParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ novaSenha }: TypeForm) => {
    try {
      setIsLoading(true);

      const response = await api.put("Usuario/TrocarSenhaTemporaria", {
        email,
        senha: password,
        novaSenha,
      });

      if (response.data === 0) {
        Alert.alert(
          reponses[response.data].title,
          reponses[response.data].subtitle,
          [
            {
              text: reponses[response.data].text,
              onPress: () => navigation.navigate("SignInScreen"),
            },
          ],
        );
      }

      if (response.data !== 0) {
        Alert.alert(
          reponses[response.data].title,
          reponses[response.data].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(reponses[3].title, reponses[3].subtitle);
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

      <ButtonFull
        title="Avançar"
        isLoading={isLoading}
        onPress={handleSubmit(handleNextPage)}
      />
    </LayoutDefault>
  );
}
