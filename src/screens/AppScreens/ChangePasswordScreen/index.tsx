import { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, Text, VStack } from "native-base";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/authentication";

import { Form } from "./types";
import { schema, initialState } from "./constants";

function ChangePasswordScreen() {
  const { colors } = THEME;

  const { user } = useAuth();
  const navigation = useNavigation();

  const [state, setState] = useState(initialState);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const toggleVisible = () => {
    setState((prevState) => ({ ...prevState, isVisible: !state.isVisible }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const handleUpdatePassword = async ({ current, newPassword }: Form) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const data = {
        codigoUsuario: user?.codigoUsuario,
        senha: current,
        novaSenha: newPassword,
      };

      const response = await api.put("Usuario/AlterarSenha", data);

      Alert.alert(
        state.responses[response.data].title,
        state.responses[response.data].subtitle,
        [
          {
            text: response.data === 0 ? "Voltar" : "Tentar novamente",
            onPress: () =>
              response.data === 0 ? navigation.goBack() : () => {},
          },
        ],
      );
    } catch (error) {
      Alert.alert(state.responses[5].title, state.responses[5].subtitle);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
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

        <ScrollView style={{ padding: 16 }}>
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
                secureTextEntry={state.isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.current?.message}
                InputRightElement={
                  <IconButton
                    onPress={toggleVisible}
                    icon={
                      <MaterialIcons
                        name={state.isVisible ? "visibility" : "visibility-off"}
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
                secureTextEntry={state.isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.newPassword?.message}
                InputRightElement={
                  <IconButton
                    onPress={toggleVisible}
                    icon={
                      <MaterialIcons
                        name={state.isVisible ? "visibility" : "visibility-off"}
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
                secureTextEntry={state.isVisible}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmNewPassword?.message}
                InputRightElement={
                  <IconButton
                    onPress={toggleVisible}
                    icon={
                      <MaterialIcons
                        name={state.isVisible ? "visibility" : "visibility-off"}
                        size={20}
                        color={colors.blue[700]}
                      />
                    }
                  />
                }
              />
            )}
          />
        </ScrollView>
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
          isLoading={state.isLoading}
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
          isDisabled={state.isLoading}
          _pressed={{
            background: "white",
          }}
          onPress={() => navigation.goBack()}
        />
      </VStack>
    </LayoutDefault>
  );
}

export { ChangePasswordScreen };
