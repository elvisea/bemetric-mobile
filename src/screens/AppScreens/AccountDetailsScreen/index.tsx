import { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Text, VStack, Button as ButtonNativeBase } from "native-base";

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

import { Form } from "./interfaces";
import { responses, schema } from "./constants";

export function AccountDetailsScreen() {
  const { colors } = THEME;

  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const defaultValues = {
    name: user?.nomeUsuario ? user?.nomeUsuario : "",
    email: user?.email ? user?.email : "",
    mobile: user?.celular ? user?.celular : "",
    phone: user?.telefone ? user?.telefone : "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async ({ name, mobile, phone }: Form) => {
    if (user) {
      try {
        setIsLoading(true);

        const data = {
          codigoUsuario: user.codigoUsuario,
          nomeUsuario: name,
          telefone: phone,
          celular: mobile,
        };

        const response = await api.post("Usuario/AlterarUsuarioApp", data);

        if (response.status === 200) {
          user.nomeUsuario = name;
          user.celular = mobile || user.celular;
          user.telefone = phone || user.telefone;

          await updateUser(user);

          Alert.alert(responses[0].title, responses[0].subtitle);
        } else {
          const message = responses[response.data];

          if (message) {
            Alert.alert(
              responses[response.data].title,
              responses[response.data].subtitle,
            );
          } else {
            Alert.alert(responses[4].title, responses[4].subtitle);
          }
        }
      } catch (error) {
        Alert.alert(responses[3].title, responses[3].subtitle);
      } finally {
        setIsLoading(false);
      }
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

        <ScrollView style={{ padding: 16 }}>
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
            name="mobile"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                errorMessage={errors.mobile?.message}
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
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                color="#000"
                fontFamily="Roboto_400Regular"
                borderBottomColor={colors.blue[700]}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <ButtonNativeBase
            mt={6}
            variant="link"
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            <Text color="cyan.100" fontSize="md">
              Alterar Senha
            </Text>
          </ButtonNativeBase>
        </ScrollView>
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
