import React from "react";
import { Alert } from "react-native";
import { Box, Heading, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { LayoutDefault } from "@components/LayoutDefault";
import { InputToken } from "@components/InputToken";

interface FormProps {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
  fifthDigit: string;
  sixthDigit: string;
}

interface Params {
  email: string;
}

const schema = yup.object({
  firstDigit: yup.string().required("Inválido"),
  secondDigit: yup.string().required("Inválido"),
  thirdDigit: yup.string().required("Inválido"),
  fourthDigit: yup.string().required("Inválido"),
  fifthDigit: yup.string().required("Inválido"),
  sixthDigit: yup.string().required("Inválido"),
});

export function ValidateCode() {
  const navigation = useNavigation();

  const route = useRoute();
  const { email } = route.params as Params;

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

    try {
      const response = await api.post("/Usuario/ValidarCodigoAtivacao", {
        email,
        codigoAtivacao: Number(token),
      });

      console.log("Response =>", response.data);

      if (response.data === 0) {
        Alert.alert("Conta criada com sucesso!", "Conta criada com sucesso!", [
          {
            text: "Efetuar Login!",
            onPress: () => navigation.navigate("SignIn"),
          },
        ]);
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
    }
  };

  // Arrumar
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

        <HStack mt={8} justifyContent="space-between" w="100%">
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
