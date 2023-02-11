import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { LayoutDefault } from "@components/LayoutDefault";
import { InputToken } from "@components/InputToken";
import { RFValue } from "react-native-responsive-fontsize";

interface FormProps {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
  fifthDigit: string;
  sixthDigit: string;
}

interface Params {
  name: string;
  email: string;
  password: string;
  client: string;
  identification: string;
  type: number;
  tokenCliente: string;
}

const schema = yup.object({
  firstDigit: yup.string().required("Inválido"),
  secondDigit: yup.string().required("Inválido"),
  thirdDigit: yup.string().required("Inválido"),
  fourthDigit: yup.string().required("Inválido"),
  fifthDigit: yup.string().required("Inválido"),
  sixthDigit: yup.string().required("Inválido"),
});

export function VerifyToken() {
  const navigation = useNavigation();

  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const route = useRoute();
  const params = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  }: FormProps) => {
    const token = `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}${fifthDigit}${sixthDigit}`;

    const data = {
      nomeUsuario: params.name,
      emailUsuario: params.email,
      senhaUsuario: params.password,
      tipoContaCliente: params.type,
      cpfCnpjCliente: Number(params.identification),
      nomeCliente: params.client,
      tokenCliente: params.tokenCliente,
      codigoAtivacao: Number(token),
    };

    try {
      setIsSending(true);

      const response = await api.post("/Usuario/CriarContaApp", data);

      if (response.data === 0) {
        Alert.alert(
          "Conta criada com sucesso!",
          "Conta criada com sucesso. Você já fazer login na sua conta!",
          [
            {
              text: "Login",
              onPress: () => navigation.navigate("SignIn"),
            },
          ]
        );
      }

      if (response.data === 1) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Erro no código de ativação. Tente novamente."
        );
      }

      if (response.data === 2) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Erro código de ativação expirado. Tente novamente."
        );
      }

      if (response.data === 3) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Email já cadastrado. Tente novamente."
        );
      }

      if (response.data === 4) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "CNPJ ou CPF já existente. Tente novamente."
        );
      }

      if (response.data === 5) {
        Alert.alert(
          "Erro ao tentar criar conta",
          "Token do cliente não existe. Tente novamente."
        );
      }
    } catch (error) {
      Alert.alert("Erro ao tentar criar conta", `${error}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleResendToken = async () => {
    try {
      setIsResending(true);

      const response = await api.post(
        `/Usuario/GerarCodigoAtivacao?email=${params.email}`
      );

      if (response.data === 1) {
        Alert.alert(
          "Código reenviado com sucesso!",
          "Código reenviado com sucesso. Verifique sua caixa de e-mail."
        );
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <LayoutDefault
      bg="blue.700"
      firstIcon="chevron-left"
      handleFirstIcon={() => navigation.goBack()}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <VStack
        px="16px"
        pb="16px"
        flex={1}
        width="full"
        justifyContent="space-between"
      >
        <Text
          fontSize={16}
          color={THEME.colors.white}
          fontFamily="Roboto_400Regular"
        >
          Um código de ativação foi enviado para o{"\n"}e-mail cadastrado.{"\n"}
          {"\n"}
          Aguarde alguns minutos e confira seu{"\n"}e-mail. Se não visualizar na
          caixa principal,{"\n"}confira no lixo eletrônico.{"\n"}
          Caso não receba solicite o reenvio do código no aplicativo.{"\n"}
          {"\n"}
          Preencha os campos abaixo com o código de validação recebido.
        </Text>

        <HStack justifyContent="space-between" w="100%">
          <Box width="14%">
            <Controller
              control={control}
              name="firstDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.firstDigit?.message}
                />
              )}
            />
          </Box>

          <Box width="14%">
            <Controller
              control={control}
              name="secondDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.secondDigit?.message}
                />
              )}
            />
          </Box>

          <Box width="14%">
            <Controller
              control={control}
              name="thirdDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.thirdDigit?.message}
                />
              )}
            />
          </Box>

          <Box width="14%">
            <Controller
              control={control}
              name="fourthDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.fourthDigit?.message}
                />
              )}
            />
          </Box>

          <Box width="14%">
            <Controller
              control={control}
              name="fifthDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.fifthDigit?.message}
                />
              )}
            />
          </Box>

          <Box width="14%">
            <Controller
              control={control}
              name="sixthDigit"
              render={({ field: { onChange, value } }) => (
                <InputToken
                  placeholder="0"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.sixthDigit?.message}
                />
              )}
            />
          </Box>
        </HStack>

        <Box>
          <Button
            title="Reenviar Código"
            h={52}
            w="full"
            mb={4}
            isLoading={isResending}
            onPress={handleResendToken}
          />

          <Button
            title="Enviar"
            h={52}
            w="full"
            isLoading={isSending}
            onPress={handleSubmit(handleNextPage)}
          />
        </Box>
      </VStack>
    </LayoutDefault>
  );
}
