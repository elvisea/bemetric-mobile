import { Alert } from "react-native";

import { useNavigation, DrawerActions } from "@react-navigation/native";

import axios from "axios";
import { ScrollView, Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { IResponse } from "@interfaces/IResponse";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

interface IFormProps {
  name: string;
  description: string;
}

const schema = yup.object({
  name: yup.string().required("Informe o seguinte campo"),
  description: yup.string().required("Informe o seguinte campo"),
});

const response: IResponse = {
  0: {
    title: "Agrupamento cadastrado com sucesso.",
    subtitle: "Mostrar agrupamentos.",
  },
  1: {
    title: "Cliente não localizado.",
    subtitle: "Cliente não localizado.",
  },
  2: {
    title: "Nome de agrupamento já cadastrado.",
    subtitle: "Nome de agrupamento já cadastrado.",
  },
  3: {
    title: "Falha na gravação do agrupamento",
    subtitle: "Falha na gravação do agrupamento",
  },
};

export function AddGrouping() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const { customer } = useCustomer();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  async function handleSaveGrouping({ name, description }: IFormProps) {
    try {
      const { data } = await api.post("/Agrupamento/Cadastro", {
        incluir: true,
        codigoCliente: customer?.codigoCliente,
        nomeAgrupamento: name,
        descricao: description,
      });

      if (data === 0) {
        Alert.alert(`${response[data].title}`, `${response[data].subtitle}`, [
          {
            text: "Mostrar Agrupamentos",
            onPress: () => navigation.navigate("ChooseGrouping"),
          },
        ]);
      } else {
        Alert.alert(`${response[data].title}`, `${response[data].subtitle}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Adicionar Agrupamento" />

      <ScrollView w="full">
        <VStack
          flex={1}
          w="full"
          px={`${RFValue(16)}px`}
          py={`${RFValue(24)}px`}
        >
          <Text
            color="blue.700"
            fontSize="13px"
            marginBottom="12px"
            fontFamily="Roboto_400Regular"
          >
            Nome*
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                borderBottomColor="blue.700"
                py={0}
                _input={{
                  color: "#333333",
                  fontSize: "16px",
                  fontFamily: "Roboto_400Regular",
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Text
            mt={`${RFValue(24)}px`}
            color="blue.700"
            fontSize="13px"
            marginBottom="12px"
            fontFamily="Roboto_400Regular"
          >
            Descrição*
          </Text>

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                borderBottomColor="blue.700"
                py={0}
                _input={{
                  color: "#333333",
                  fontSize: "16px",
                  fontFamily: "Roboto_400Regular",
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </VStack>
      </ScrollView>

      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleSaveGrouping)} />
    </LayoutDefault>
  );
}
