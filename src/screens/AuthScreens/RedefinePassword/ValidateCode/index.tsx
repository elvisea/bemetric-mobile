import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import { HStack, Text, VStack } from "native-base";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { InputToken } from "@components/InputToken";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormProps {
  [index: string]: string;
}

interface Params {
  email: string;
}

const schema = yup.object({
  "1": yup.string().required("Inválido"),
  "2": yup.string().required("Inválido"),
  "3": yup.string().required("Inválido"),
  "4": yup.string().required("Inválido"),
  "5": yup.string().required("Inválido"),
  "6": yup.string().required("Inválido"),
});

export function ValidateCode() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params as Params;

  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const behavior = Platform.OS === "ios" ? "padding" : "height";

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
      setIsSending(true);

      const response = await api.post("/Usuario/ValidarCodigoAtivacao", {
        email,
        codigoAtivacao: Number(token),
      });

      console.log("Response =>", response.data);

      if (response.data === 0) {
        navigation.navigate("EnterNewPassword", {
          codigoAtivacao: token,
          email,
        });
      }

      if (response.data === 1) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Código de ativação inválido. Tente novamente."
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Código de ativação expirado. Tente novamente."
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
        `/Usuario/GerarCodigoAtivacao?email=${email}`
      );

      if (response.data === 1) {
        Alert.alert(
          "Código reenviado com sucesso!",
          "Código reenviado com sucesso. Verifique seu e-mail."
        );
      }
    } catch (error) {
      Alert.alert(
        "Não foi possível reenviar o código!",
        "Não foi possível reenviar o código. Tente novamente mais tarde."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <LayoutDefault
      bg="blue.700"
      firstIcon="chevron-left"
      handleFirstIcon={() => navigation.goBack()}
      justifyContent="space-between"
    >
      <KeyboardAvoidingView style={styles.keyboard} behavior={behavior}>
        <VStack flex={1} w="full" justifyContent="space-between" bg="blue.700">
          <VStack flex={1} w="full" p={4} bg="blue.700">
            <Text
              fontSize={16}
              color={THEME.colors.white}
              fontFamily="Roboto_400Regular"
            >
              Um código de ativação foi enviado para o{"\n"}e-mail cadastrado.
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
                <Controller
                  key={item}
                  control={control}
                  name={item}
                  render={({ field: { onChange, value } }) => (
                    <InputToken
                      value={value}
                      placeholder="0"
                      borderWidth={1}
                      borderRadius={6}
                      // keyboardType="numeric"
                      returnKeyType="go"
                      h="52px"
                      // w="52px"
                      onChangeText={onChange}
                      errorMessage={errors[item]?.message}
                    />
                  )}
                />
                // <Box key={item} width="52px">
                // </Box>
              ))}
            </HStack>
          </VStack>

          <VStack w="full" p={4} bg="blue.700">
            <Button
              title="Reenviar Código"
              h="52px"
              w="full"
              mb={4}
              isLoading={isResending}
              onPress={handleResendToken}
            />

            <Button
              title="Enviar"
              h="52px"
              w="full"
              isLoading={isSending}
              onPress={handleSubmit(handleNextPage)}
            />
          </VStack>
        </VStack>
      </KeyboardAvoidingView>
    </LayoutDefault>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    width: "100%",
  },
});
