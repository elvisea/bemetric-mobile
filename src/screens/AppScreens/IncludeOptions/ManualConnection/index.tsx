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
  nome: string;
  senha: string;
}

export function ManualConnection() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const schema = yup.object({
    nome: yup.string().required("Informe o nome."),
    senha: yup.string().required("Informe a senha."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Conexão WIFI" />

      <VStack flex={1} w="full" p="16px">
        <Text color="blue.700" fontFamily="Roboto_400Regular" fontSize="13px">
          Nome
        </Text>

        <Controller
          control={control}
          name="nome"
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
              errorMessage={errors.nome?.message}
            />
          )}
        />

        <Text
          color="blue.700"
          fontFamily="Roboto_400Regular"
          fontSize="13px"
          mt={`${RFValue(32)}px`}
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

      <ButtonFull title="Salvar" onPress={() => {}} />
    </LayoutDefault>
  );
}
