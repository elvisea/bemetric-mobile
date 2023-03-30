import { useState } from "react";
import { Text, VStack, Button as ButtonNativeBase } from "native-base";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { Alert } from "react-native";
import { useAuth } from "@hooks/auth";

interface FormProps {
  name: string;
  email?: string;
  celular?: string;
  telefone?: string;
}

const schema = yup.object({
  name: yup.string().required("Informe seu email."),
  celular: yup.string().optional(),
  telefone: yup.string().optional(),
});

interface IResponses {
  [index: number]: string;
}

const responses: IResponses = {
  0: "Usuário alterado com sucesso",
  1: "Usuário não existe",
  2: "Usuário não pode ser alterado",
};

export function AccountDetails() {
  const { user } = useAuth();
  const { colors } = THEME;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  console.log("USER CTX", user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: user?.nomeUsuario,
      email: user?.email,
      celular: user?.celular,
      telefone: user?.telefone,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async ({ name, celular, telefone }: FormProps) => {
    try {
      setIsLoading(true);

      const data = {
        codigoUsuario: user?.codigoUsuario,
        nomeUsuario: name,
        telefone: telefone,
        celular: celular,
      };

      console.log("Enviado:", data);

      const response = await api.post("Usuario/AlterarUsuarioApp", data);

      console.log("Response:", responses[response.data]);
      Alert.alert(responses[response.data], responses[response.data]);
    } catch (error) {
      Alert.alert(`${error}`, `${error}`);
      console.log(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <VStack w="full" flex={1}>
        <HeaderDefault title="Detalhes da Conta" />

        <VStack w="full" p="16px" flex={1}>
          <Text color="blue.700" fontSize="12px" fontFamily="Roboto_400Regular">
            Nome
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Text
            color="blue.700"
            mt={4}
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Email
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                isDisabled
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Text
            color="blue.700"
            mt={4}
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Celular
          </Text>

          <Controller
            control={control}
            name="celular"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.celular?.message}
              />
            )}
          />

          <Text
            color="blue.700"
            mt={4}
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Telefone
          </Text>

          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.telefone?.message}
              />
            )}
          />

          <ButtonNativeBase
            mt={6}
            variant="link"
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text color="cyan.100" fontSize="md">
              Alterar Senha
            </Text>
          </ButtonNativeBase>
        </VStack>
      </VStack>

      <VStack w="full" pb="16px" paddingX="16px">
        <Button
          title="Alterar"
          w="full"
          mt={8}
          h={52}
          isLoading={isLoading}
          onPress={handleSubmit(handleUpdateUser)}
        />
      </VStack>
    </LayoutDefault>
  );
}
