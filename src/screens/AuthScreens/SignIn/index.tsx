import React from "react";
import { Box, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "@assets/logo.svg";

import { useAuth } from "@hooks/auth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";

interface FormProps {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("Informe seu e-mail.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
});

export function SignIn() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();

  const handleLogin = async ({ email, password }: FormProps) => {
    try {
      signIn({ email, password });
    } catch (error) {
      console.log("ERROR =>", error);
    }
  };

  const handleCreateAccount = () => navigation.navigate("NameAndEmail");

  return (
    <VStack
      flex={1}
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="blue.700"
    >
      <Box width="full" px={8} alignItems="center" mt={122}>
        <Logo />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              mb={4}
              mt={90}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          mt={8}
          w={188}
          h={52}
          onPress={handleSubmit(handleLogin)}
        />
      </Box>

      <Box w="full">
        <ButtonFull title="CRIAR CONTA" onPress={handleCreateAccount} />
      </Box>
    </VStack>
  );
}
