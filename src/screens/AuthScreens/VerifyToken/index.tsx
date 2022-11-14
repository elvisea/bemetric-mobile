import React from "react";
import { Alert } from "react-native";
import { Box, Heading } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { LayoutDefault } from "@components/LayoutDefault";

interface FormDataProps {
  token: string;
}

interface Params {
  name: string;
  email: string;
  password: string;
  client: string;
  identification: string;
}

const schema = yup.object({
  token: yup
    .string()
    .required("Informe seu token.")
    .min(6, "O Token deve ter pelo menos 6 dígitos."),
});

export function VerifyToken() {
  const navigation = useNavigation();

  const route = useRoute();
  const { name, email, password, client, identification } =
    route.params as Params;

  console.log("PARAMS =>", route.params);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async ({ token }: FormDataProps) => {
    const data = {
      // codigoUsuario: 0,
      nomeUsuario: name,
      emailUsuario: email,
      senhaUsuario: password,
      codigoCliente: 0,
      tipoContaCliente: 0,
      cpfCnpjCliente: Number(identification),
      nomeCliente: client,
      // tokenCliente: 0,
      codigoAtivacao: token,
    };

    console.log("DATA =>", data);
    try {
      const response = await api.post("/Usuario/CriarContaApp", data);

      console.log("Response =>", response.data);

      if (response.data === 0) navigation.navigate("SignIn");

      if (response.data !== 0) {
        Alert.alert(response.data);
      }
    } catch (error) {
      console.log("=> =>", error)
      Alert.alert(`${error}`);
    }
  };

  const handleResendToken = async () => {
    try {
      const response = await api.post(
        `/Usuario/GerarCodigoAtivacao?email=${email}`
      );

      if (response.data === 1) {
        Alert.alert("OK");
      }
    } catch (error) {
      console.log("ERROR =>", error);
    }
  };

  return (
    <LayoutDefault
      bg="blue.700"
      icon="chevron-left"
      functionIcon={() => navigation.goBack()}
      justifyContent="space-between"
    >
      <Box px={4} width="full" alignItems="center" justifyContent="center">
        <Heading
          size={"sm"}
          mb={8}
          textAlign="center"
          color={THEME.colors.white}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>

        <Heading
          size={"sm"}
          mb={8}
          textAlign="center"
          color={THEME.colors.white}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>

        <Heading size={"sm"} textAlign="center" color={THEME.colors.white}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Heading>

        <Controller
          control={control}
          name="token"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Insira seu Token."
              keyboardType="numeric"
              returnKeyType="send"
              onChangeText={onChange}
              mt={16}
              value={value}
              errorMessage={errors.token?.message}
            />
          )}
        />

      </Box>

      <Box w="full" px={4} mb={8}>
        <Button
          title="Reenviar Código"
          h={52}
          w="full"
          mb={4}
          onPress={handleResendToken}
        />

        <Button
          title="Enviar"
          h={52}
          w="full"
          onPress={handleSubmit(handleNextPage)}
        />
      </Box>
    </LayoutDefault>
  );
}
