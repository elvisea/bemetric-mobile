import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Alert, ScrollView, StyleSheet } from "react-native";

import { Box, HStack, Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { TypeForm, TypeParams } from "./types";
import { resposta, schema } from "./constants";

import { Button } from "@components/Button";
import { InputToken } from "@components/InputToken";
import { LayoutDefault } from "@components/LayoutDefault";

export function ValidateCodeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params as TypeParams;

  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (props: TypeForm) => {
    const token = Object.values(props).join("");

    try {
      setIsSending(true);

      const response = await api.post("/Usuario/ValidarCodigoAtivacao", {
        email,
        codigoAtivacao: Number(token),
      });

      if (response.data === 0) {
        navigation.navigate("EnterNewPasswordScreen", {
          codigoAtivacao: token,
          email,
        });
      }

      if (response.data !== 0) {
        Alert.alert(
          resposta.validation[response.data].title,
          resposta.validation[response.data].subtitle,
        );
      }
    } catch (error) {
      Alert.alert("Erro ao tentar criar conta", `${error}`);
    } finally {
      setIsSending(false);
    }
  };

  // Arrumar
  const handleResendToken = async () => {
    try {
      setIsResending(true);

      const response = await api.post(
        `/Usuario/GerarCodigoAtivacao?email=${email}`,
      );

      if (response.data === 1) {
        Alert.alert(
          resposta.resend[response.data].title,
          resposta.resend[response.data].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        "Não foi possível reenviar o código!",
        "Não foi possível reenviar o código. Tente novamente mais tarde.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <LayoutDefault
      bg="blue.700"
      firstIcon="chevron-left"
      alignItems="flex-start"
      justifyContent="flex-start"
      handleFirstIcon={() => navigation.goBack()}
    >
      <ScrollView style={styles.scroll}>
        <VStack flex={1} w="full" justifyContent="space-between" bg="blue.700">
          <VStack flex={1} w="full" p={4} bg="blue.700">
            <Text
              fontSize={16}
              color={THEME.colors.white}
              fontFamily="Roboto_400Regular"
            >
              Um código de validação foi enviado para o{"\n"}e-mail cadastrado.
              {"\n"}
              {"\n"}
              Aguarde alguns minutos e confira seu{"\n"}e-mail. Se não
              visualizar na caixa principal,{"\n"}confira no lixo eletrônico.
              {"\n"}
              Caso não receba solicite o reenvio do código no aplicativo.{"\n"}
              {"\n"}
              Preencha os campos abaixo com o código de validação recebido.
            </Text>

            <HStack mt={12} justifyContent="space-between" w="100%">
              {Array.of("1", "2", "3", "4", "5", "6").map((item) => (
                <Box key={item} width={`${RFValue(52)}px`}>
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
                        h={`${RFValue(52)}px`}
                        onChangeText={onChange}
                        errorMessage={errors[item]?.message}
                      />
                    )}
                  />
                </Box>
              ))}
            </HStack>
          </VStack>

          <VStack w="full" p={4} bg="blue.700">
            <Button
              title="Reenviar Código"
              h={`${RFValue(52)}px`}
              w="full"
              mb={4}
              isLoading={isResending}
              onPress={handleResendToken}
            />

            <Button
              title="Enviar"
              h={`${RFValue(52)}px`}
              w="full"
              isLoading={isSending}
              onPress={handleSubmit(handleNextPage)}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </LayoutDefault>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
});
