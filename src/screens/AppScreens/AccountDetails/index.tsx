import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, Text, VStack } from "native-base";

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
  email: string;
  current: string;
  newPassword: string;
  confirmNewPassword: string;
}

const schema = yup.object({
  name: yup.string().required("Informe seu nome."),
  email: yup.string().required("Informe seu e-mail.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
  current: yup
    .string()
    .required("Informe sua senha")
    .min(4, "A senha deve ter pelo menos 4 dígitos."),
});

export function AccountDetails() {
  const { colors } = THEME;

  const { user } = useAuth();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async ({
    email,
    current,
    newPassword,
    name,
  }: FormProps) => {
    console.log(email, newPassword, name);

    try {
      setIsLoading(true);

      const response = await api.post("Usuario/AlterarSenha", {
        codigoUsuario: user?.codigoUsuario,
        nomeUsuario: name,
        email: email,
        senha: current,
        novaSenha: newPassword,
      });

      console.log(response.data);
    } catch (error) {
      Alert.alert(`${error}`, `${error}`);
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
            mt="16px"
            color="blue.700"
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            E-mail
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Text
            mt="16px"
            color="blue.700"
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Senha atual
          </Text>

          <Controller
            control={control}
            name="current"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                secureTextEntry={isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.current?.message}
                InputRightElement={
                  <IconButton
                    onPress={() => setIsVisible(!isVisible)}
                    icon={
                      <MaterialIcons
                        name={isVisible ? "visibility" : "visibility-off"}
                        size={20}
                        color={colors.blue[700]}
                      />
                    }
                  />
                }
              />
            )}
          />

          <Text
            mt="16px"
            color="blue.700"
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Nova Senha
          </Text>

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                secureTextEntry={isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.newPassword?.message}
                InputRightElement={
                  <IconButton
                    onPress={() => setIsVisible(!isVisible)}
                    icon={
                      <MaterialIcons
                        name={isVisible ? "visibility" : "visibility-off"}
                        size={20}
                        color={colors.blue[700]}
                      />
                    }
                  />
                }
              />
            )}
          />

          <Text
            mt="16px"
            color="blue.700"
            fontSize="12px"
            fontFamily="Roboto_400Regular"
          >
            Confirmar Nova Senha
          </Text>

          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                secureTextEntry={isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmNewPassword?.message}
                InputRightElement={
                  <IconButton
                    onPress={() => setIsVisible(!isVisible)}
                    icon={
                      <MaterialIcons
                        name={isVisible ? "visibility" : "visibility-off"}
                        size={20}
                        color={colors.blue[700]}
                      />
                    }
                  />
                }
              />
            )}
          />
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
