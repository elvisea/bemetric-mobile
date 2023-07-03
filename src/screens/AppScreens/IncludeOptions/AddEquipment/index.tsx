import { Alert } from "react-native";
import { useCallback, useState } from "react";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView, Select, Text, VStack } from "native-base";

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
  identifier: string;
  model: string;
  placa: string;
}

interface ITypesEquipment {
  tipoEquipamento: string;
}

const response: IResponse = {
  0: {
    title: "Equipamento cadastrado com sucesso.",
    subtitle: "Mostrar equipamentos.",
  },
  1: {
    title: "Nome de equipamento já cadastrado.",
    subtitle: "Nome de equipamento já cadastrado.",
  },
  2: {
    title: "Identificador do equipamento já cadastrado.",
    subtitle: "Identificador do equipamento já cadastrado.",
  },
  3: {
    title: "Placa do equipamento já cadastrado.",
    subtitle: "Placa do equipamento já cadastrado.",
  },
  4: {
    title: "Falha na gravação do equipamento",
    subtitle: "Falha na gravação do equipamento",
  },
};

const schema = yup.object({
  name: yup.string().required("Informe o seguinte campo"),
  identifier: yup.string().required("Informe o seguinte campo"),
  model: yup.string().required("Informe o seguinte campo"),
  placa: yup.string().required("Informe o seguinte campo"),
});

export function AddEquipment() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const { customer } = useCustomer();

  const [typesEquipment, setTypesEquipment] = useState<ITypesEquipment[]>([]);

  const [typeSelected, setTypeSelected] = useState("");

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  async function handleSaveEquipment({
    name,
    identifier,
    model,
    placa,
  }: IFormProps) {
    try {
      const { data } = await api.post("/Equipamento/Cadastro", {
        incluir: true,
        codigoCliente: customer?.codigoCliente,
        tipoEquipamento: typeSelected,
        nomeEquipamento: name,
        identificador: identifier,
        modelo: model,
        placa,
      });

      if (data === 0) {
        Alert.alert(`${response[data].title}`, `${response[data].subtitle}`, [
          {
            text: "Mostrar Equipamentos",
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

  const fetchTypesEquipment = async () => {
    try {
      const response = await api.post("/Equipamento/ObterListaFiltroTipo", {
        codigoCliente: customer?.codigoCliente,
      });

      setTypesEquipment(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const handleSelectTypeEquipment = (selected: string) => {
    const selectedType = typesEquipment.find(
      (type) => type.tipoEquipamento === selected
    );
    if (selectedType) setTypeSelected(selectedType.tipoEquipamento);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchTypesEquipment();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Adicionar Equipamento" />

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
            Tipo*
          </Text>

          <Select
            p="0"
            h="30px"
            minWidth="100%"
            accessibilityLabel="Choose Consumer"
            fontSize="16px"
            fontFamily={THEME.fonts.Roboto_400Regular}
            color={"#333333"}
            dropdownIcon={
              <Feather
                name="chevron-down"
                size={24}
                color={THEME.colors.blue[700]}
              />
            }
            borderTopWidth={0}
            borderLeftWidth={0}
            borderRightWidth={0}
            borderRadius={0}
            borderBottomColor="blue.700"
            onValueChange={(selected) => handleSelectTypeEquipment(selected)}
          >
            {typesEquipment.length > 0 &&
              typesEquipment.map((customer) => (
                <Select.Item
                  key={customer.tipoEquipamento}
                  alignItems="center"
                  value={customer.tipoEquipamento.toString()}
                  label={customer.tipoEquipamento}
                />
              ))}
          </Select>

          <Text
            mt={`${RFValue(24)}px`}
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
            Identificador*
          </Text>

          <Controller
            control={control}
            name="identifier"
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
                errorMessage={errors.identifier?.message}
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
            Modelo
          </Text>

          <Controller
            control={control}
            name="model"
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
                errorMessage={errors.model?.message}
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
            Placa
          </Text>

          <Controller
            control={control}
            name="placa"
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
                errorMessage={errors.placa?.message}
              />
            )}
          />
        </VStack>
      </ScrollView>

      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleSaveEquipment)} />
    </LayoutDefault>
  );
}
