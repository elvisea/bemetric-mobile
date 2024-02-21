import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

import { Box, Heading, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Action, Params } from "./types";
import { initialState } from "./constants";

import { Inputs } from "@components/Inputs";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";

export function ClientCodeScreen() {
  const navigation = useNavigation();

  const [state, setState] = useState(initialState);

  const route = useRoute();
  const params = route.params as Params;

  const onValueChanges = (values: string[]) => {
    setState((prevState) => ({ ...prevState, values: values }));
  };

  const submitForm = useCallback(() => {
    const isFormValid = state.values.every((value) => value.trim() !== "");

    isFormValid
      ? verifyToken()
      : showAlert({ response: state.responses.form[0] });
  }, [state.values]);

  const navigateToNextStep = (token: string) => {
    navigation.navigate("CreatePasswordScreen", {
      type: params.type,
      name: params.name,
      email: params.email,
      tokenCliente: token,
    });
  };

  const showAlert = ({ response, action }: Action) => {
    Alert.alert(response.title, response.subtitle, [{ onPress: action }]);
  };

  const verifyToken = async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const token = Object.values(state.values).join("");

      const response = await api.get(`/Cliente/ValidarToken?token=${token}`);

      switch (response.data) {
        case 0:
          showAlert({ response: state.responses.validation[0] });
          break;

        case 1:
          showAlert({
            action: () => navigateToNextStep(token),
            response: state.responses.validation[1],
          });
          break;

        default:
          showAlert({ response: state.responses.unknown[0] });
          break;
      }
    } catch (error) {
      showAlert({ response: state.responses.network[0] });
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
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
        px={4}
        flex={1}
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Insira o token fornecido pelo{"\n"}administrador do cliente.
        </Heading>

        <HStack mt={12} justifyContent="space-between" w="100%">
          <Inputs inputs={6} onValueChanges={onValueChanges} />
        </HStack>
      </Box>
      <ButtonFull
        title="Avançar"
        isLoading={state.isLoading}
        onPress={submitForm}
      />
    </LayoutDefault>
  );
}
