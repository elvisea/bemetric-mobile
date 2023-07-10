import { useState } from "react";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, Text, VStack } from "native-base";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useAuth } from "@hooks/auth";

import { FormProps } from "./interfaces";
import { schema } from "./constants/schema";
import { responses } from "./constants/responses";

function ChangePassword() {
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

  const handleUpdatePassword = async ({ current, newPassword }: FormProps) => {
    try {
      setIsLoading(true);

      const data = {
        codigoUsuario: user?.codigoUsuario,
        senha: current,
        novaSenha: newPassword,
      };

      const response = await api.put("Usuario/AlterarSenha", data);

      Alert.alert(responses[response.data], responses[response.data], [
        {
          text: response.data === 0 ? "Voltar" : "Tentar novamente",
          onPress: () => (response.data === 0 ? navigation.goBack() : () => {}),
        },
      ]);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
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
        <HeaderDefault title="Alterar Senha" />

        <VStack w="full" p="16px" flex={1}>
          <Text color="blue.700" fontSize="12px" fontFamily="Roboto_400Regular">
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

      <VStack
        w="full"
        flexDir="row"
        justifyContent="space-between"
        pb="16px"
        paddingX="16px"
      >
        <Button
          title="Concluir"
          w="48.5%"
          mt={8}
          h={52}
          isLoading={isLoading}
          onPress={handleSubmit(handleUpdatePassword)}
        />

        <Button
          title="Cancelar"
          bg="white"
          borderColor="blue.700"
          color={THEME.colors.blue[700]}
          w="48.5%"
          mt={8}
          h={52}
          isDisabled={isLoading}
          _pressed={{
            background: "white",
          }}
          onPress={() => navigation.goBack()}
        />
      </VStack>
    </LayoutDefault>
  );
}

export { ChangePassword };
