import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Alert, ScrollView, StyleSheet } from "react-native";

import { HStack, Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Params } from "./types";
import { initialState } from "./constants";

import { Button } from "@components/Button";
import { Inputs } from "@components/Inputs";
import { LayoutDefault } from "@components/LayoutDefault";

export function ValidateCodeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params as Params;

  const [state, setState] = useState(initialState);

  const navigateToNextStep = (token: string) => {
    navigation.navigate("EnterNewPasswordScreen", {
      codigoAtivacao: token,
      email,
    });
  };

  const verifyToken = async () => {
    try {
      setState((prevState) => ({ ...prevState, isSending: true }));

      const token = Object.values(state.values).join("");

      const response = await api.post("/Usuario/ValidarCodigoAtivacao", {
        email,
        codigoAtivacao: Number(token),
      });

      const message = state.responses.validation[response.data];

      if (message) {
        if (response.data === 0) {
          Alert.alert(message.title, message.subtitle, [
            { onPress: () => navigateToNextStep(token), text: message.text },
          ]);
        } else {
          Alert.alert(message.title, message.subtitle);
        }
      } else {
        Alert.alert(
          state.responses.unknown[0].title,
          state.responses.unknown[0].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        state.responses.network[0].title,
        state.responses.network[0].subtitle,
      );
    } finally {
      setState((prevState) => ({ ...prevState, isSending: false }));
    }
  };

  const resendToken = async () => {
    try {
      setState((prevState) => ({ ...prevState, isResending: true }));

      const response = await api.post("/Usuario/EsqueciSenha", {
        email,
        tipoAplicacao: 0,
      });

      const message = state.responses.resend[response.data];

      if (message) {
        Alert.alert(message.title, message.subtitle);
      } else {
        Alert.alert(
          state.responses.unknown[0].title,
          state.responses.unknown[0].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        state.responses.network[0].title,
        state.responses.network[0].subtitle,
      );
    } finally {
      setState((prevState) => ({ ...prevState, isResending: false }));
    }
  };

  const onValueChanges = (values: string[]) => {
    setState((prevState) => ({ ...prevState, values: values }));
  };

  const showAlert = () => {
    Alert.alert(
      "Campos Incompletos",
      "Por favor, preencha todos os campos para continuar.",
    );
  };

  const submitForm = useCallback(() => {
    const isFormValid = state.values.every((value) => value.trim() !== "");

    isFormValid ? verifyToken() : showAlert();
  }, [state.values]);

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
              <Inputs inputs={6} onValueChanges={onValueChanges} />
            </HStack>
          </VStack>

          <VStack w="full" p={4} bg="blue.700">
            <Button
              title="Reenviar Código"
              h={`${RFValue(52)}px`}
              w="full"
              mb={4}
              isLoading={state.isResending}
              onPress={resendToken}
            />

            <Button
              title="Enviar"
              h={`${RFValue(52)}px`}
              w="full"
              isLoading={state.isSending}
              onPress={submitForm}
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
