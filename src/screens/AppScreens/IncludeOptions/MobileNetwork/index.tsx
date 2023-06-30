import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

interface IForm {
  ponto: string;
  usuario: string;
  senha: string;
}

const schema = yup.object({
  ponto: yup.string().required("Informe o ponto de acesso."),
  usuario: yup.string().required("Informe a usuário."),
  senha: yup.string().required("Informe a senha."),
});

export function MobileNetwork() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: IForm) => {
    console.log(data);
  };

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Conexão Redes Móveis" />

      <VStack flex={1} w="full" paddingX="16px">
        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(16)}px`}
        >
          Ponto de acesso
        </Text>

        <Controller
          control={control}
          name="ponto"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Roboto_400Regular",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.ponto?.message}
            />
          )}
        />

        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(16)}px`}
        >
          Usuário
        </Text>

        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Roboto_400Regular",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.usuario?.message}
            />
          )}
        />

        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(16)}px`}
        >
          Senha
        </Text>

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Roboto_400Regular",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.senha?.message}
            />
          )}
        />
      </VStack>

      <ButtonFull title="Salvar" onPress={handleSubmit(handleNextPage)} />
    </LayoutDefault>
  );
}
