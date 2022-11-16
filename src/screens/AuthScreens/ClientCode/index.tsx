import React from "react";
import { Alert } from "react-native";
import { Box, Heading, HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";

import { THEME } from "@theme/theme";
import { ButtonFull } from "@components/ButtonFull";
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
  name: string;
  email: string;
  type: number;
}

const schema = yup.object({
  firstDigit: yup.string().required("Inválido"),
  secondDigit: yup.string().required("Inválido"),
  thirdDigit: yup.string().required("Inválido"),
  fourthDigit: yup.string().required("Inválido"),
  fifthDigit: yup.string().required("Inválido"),
  sixthDigit: yup.string().required("Inválido"),
});

export function ClientCode() {
  const navigation = useNavigation();

  const route = useRoute();
  const { name, email, type } = route.params as Params;

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
      const response = await api.get(`/Cliente/ValidarToken?token=${token}`);

      if (response.data === 0) {
        Alert.alert("Token inválido!", "Token inválido. Tente novamente.");
      }

      if (response.data === 1) {
        navigation.navigate("CreatePassword", {
          name,
          email,
          type,
        });
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.sixthDigit?.message}
                />
              )}
            />
          </Box>
        </HStack>
      </Box>
      <ButtonFull title="Avançar" onPress={handleSubmit(handleNextPage)} />
    </LayoutDefault>
  );
}
